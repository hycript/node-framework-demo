/*
 * @Author: linwei
 * @Date: 2023-03-10 19:26:27
 * @Last Modified by: linwei
 * @Last Modified time: 2023-09-09 18:42:58
 */
const { isPlainObject } = require('lodash');
const { createGenerator, createCondition } = require('../../utils');

const _formatter = new Intl.DateTimeFormat('zh', {
  dateStyle: 'short',
  timeStyle: 'medium',
});

function getLogger(ctx, customLogger) {
  if (!customLogger) return ctx.app.logger;
  return ctx.app.getLogger(customLogger);
}

let App;

function initializer(app) {
  App = app;
}

/**
 *
 * @param {object|el} log log配置,对象或表达式
 * @return {undefined}
 */
const Logger = log => function(target, name, descriptor) {
  if (!descriptor) return;
  const original = descriptor.value;

  let condition;
  let unless;
  let customLogger;

  if (isPlainObject(log)) {
    condition = log.condition;
    unless = log.unless;
    customLogger = log.customLogger;
    log = log.log;
  }

  log = createGenerator(log, original, '$result');
  condition = createCondition({ condition, unless, original, extraParams: '$result' });

  descriptor.value = async function(...args) {
    const start = new Date();
    const { ctx = App.currentContext } = this;
    const result = await original.call(this, ...args);

    if (condition && !(await condition.call(this, result, ...args))) return result;

    const end = new Date();
    const logData = [ `${target.pathName || (target.constructor && target.constructor.name) || ''}.${name}`, `${end.getTime() - start.getTime()}ms` ];
    const attach = log && log.call(this, result, ...args);
    const logger = getLogger(ctx, customLogger);
    logger.info('[logger]', JSON.stringify(logData), attach && JSON.stringify(attach));
    return result;
  };
};

module.exports = {
  initializer,
  Logger,
};
