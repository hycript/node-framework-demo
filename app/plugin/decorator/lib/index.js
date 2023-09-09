/*
 * @Author: linwei
 * @Date: 2023-09-09 18:39:50
 * @Descroption:
 */
const egg = require('egg');
// const { EggShell } = require('egg-shell-decorators');
const { initializer, decorators } = require('./decorator');
// const { routerDecoratorProcessHook, routerDecoratorFinishHook } = require('./lib/swagger');

module.exports = {
  init: app => {
    initializer(app);

    Object.assign(egg, {
      Decorator: {
        ...decorators,
      },
    });
    //   EggShell.addHook('process', routerDecoratorProcessHook);
    //   EggShell.addHook('finish', routerDecoratorFinishHook);
  },
};
