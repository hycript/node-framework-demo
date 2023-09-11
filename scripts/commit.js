const { exec } = require('./utils');

function main() {
  const packages = require('../package.json');
  const tag = `v${packages.version}`;
  exec('git add .');
  exec(`git commit -m "feat: update ${tag}"`);
  exec('git push');
}

main();
