'use strict';

const path = require('path');

module.exports = {
  decorator: {
    enable: true,
    package: path.resolve(__dirname, 'app/plugin/decorator'),
  },
};
