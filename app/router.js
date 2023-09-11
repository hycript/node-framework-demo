'use strict';

const { EggShell } = require('egg-shell-decorators');

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  EggShell(app);
};
