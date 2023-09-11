const fs = require('fs-extra');
const path = require('path');
const packages = require('../package.json');
const argv = require('minimist')(process.argv.slice(2));

const { _, M: major = false, m: minor = false, p: patch = false } = argv;
console.log('_', _);

function main() {
  const { version } = packages;
  console.log({ major, minor, patch });
  const mapper = [ major, minor, patch ];
  let flag = false;
  packages.version = version.split('.').map((key, index) => {
    if (!flag) {
      if (mapper[index]) {
        flag = true;
        // eslint-disable-next-line no-bitwise
        return (key >> 0) + 1;
      }
      return key;
    }
    return 0;
  }).join('.');

  fs.writeFileSync(path.resolve('package.json'), JSON.stringify(packages, null, 2) + '\n');
}

main();
