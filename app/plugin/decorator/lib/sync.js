/*
 * @Author: linwei
 * @Date: 2023-03-30 10:31:49
 */
const assert = require('assert');
const { isString, isFunction } = require('lodash');
const { createGenerator, createCondition } = require('../../utils');

let App;

function initializer(app) {
  App = app;
}

const Sync = ({ key, condition, unless, maxLocker, ttl }) => function(target, name, descriptor) {
  if (!descriptor) return;
  assert(!!key && (isString(key) || isFunction(key)), '`key` must be `string or function`');
  const original = descriptor.value;

  const keyGenerator = createGenerator(key, original);
  condition = createCondition({ condition, unless, original });

  descriptor.value = async function(...args) {
    const sync = !condition || await condition.call(this, ...args);
    const key = `LOCK:${keyGenerator.call(this, ...args)}`;

    if (sync) {
      const { ctx = App.currentContext } = this;
      return await ctx.runInLocker(key, () => {
        return original.call(this, ...args);
      }, maxLocker, ttl);
    }
    return original.call(this, ...args);

  };
};
module.exports = {
  initializer,
  Sync,
};
