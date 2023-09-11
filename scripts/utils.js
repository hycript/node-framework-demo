const spawn = require('cross-spawn');

exports.exec = function(command, data = {}, options = { stdio: 'inherit' }) {
  // stdio: 'inherit'
  // git push origin :refs/tags/v0.1
  command = command.replace(/{(\w+)}/g, function($$, $1) {
    return data[$1] || '';
  });
  const frags = command.replace(/"([\s\S]*?)"/g, function($$, $1) {
    return encodeURI($1);
  }).split(/\s+/).map(x => decodeURI(x));
  const cmd = frags.shift();
  return spawn.sync(cmd, frags, options);
};
