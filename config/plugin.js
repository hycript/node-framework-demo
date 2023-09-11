'use strict';

const path = require('path');

console.log('***************', __dirname, __filename);

module.exports = {
  decorator: {
    enable: true,
    package: path.resolve(__dirname, 'app/plugin/decorator'),
  },
};
