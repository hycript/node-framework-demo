const { exec } = require('./utils');

function main() {
  const packages = require('../package.json');
  const tag = `v${packages.version}`;

  let tags = exec('git tag', undefined, {});
  tags = tags.output.filter(x => !!x).toString().split(/\r?\n/);
  if (tags.includes(tag)) {
    exec(`git tag -d ${tag}`);
    exec(`git push origin :refs/tags/${tag}`);
  }

  exec(`git tag ${tag}`);
  exec(`git push origin ${tag}`);
}

main();
