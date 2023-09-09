/*
 * @Author: linwei
 * @Date: 2023-03-30 14:13:17
 * @Last Modified by: linwei
 * @Last Modified time: 2023-08-04 19:16:49
 */
require('reflect-metadata');
const { isFunction } = require('lodash');


const ORIGIN_PARAMS = 'origin_params';

function getDescriptorParams(target, name, origin) {
  const meta = Reflect.getMetadata(ORIGIN_PARAMS, target, name);
  if (meta) return meta;
  const params = origin.toString().match(/(?:async\s+)?\w+\s?.*?\(([^)]*)\)/)[1];
  Reflect.defineMetadata(ORIGIN_PARAMS, params, target, name);
  return params;
}

function createGenerator(el, original, extraParams) {
  let params = original.toString().match(/(?:async\s+)?\w+\s?.*?\(([^)]*)\)/)[1];
  params = [extraParams, params].filter(x => !!x).join(',');
  // eslint-disable-next-line no-new-func
  return isFunction(el) ? el : !el ? function () { return ''; } : new Function(`
    const gen = function(${params}) { return ${el};};
    return gen.call(this, ...arguments);
  `);
}

function createCondition({ condition, unless, original, extraParams }) {
  return (condition || unless) ? async function (...args) {
    const _condition = !!condition && createGenerator(condition, original, extraParams);
    const _unless = !condition && !!unless && createGenerator(unless, original, extraParams);
    if (_condition) return await _condition.call(this, ...args);
    return !(await _unless.call(this, ...args));
  } : undefined;
}

module.exports = {
  createGenerator,
  createCondition,
  getDescriptorParams,
};
