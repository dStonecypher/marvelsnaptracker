'use strict';

module.exports.sync = () => {
  console.log(process.platform);
  if (process.platform === 'darwin') {
    return require('./lib/macos').sync();
  }

  if (process.platform === 'win32') {
    return require('./lib/windows').sync();
  }

  if (process.platform === 'linux') {
    console.log("Linux Platform");
    return require('./lib/linux').sync();
  }

  throw new Error('macOS and Windows only');
};

module.exports.launch = (JustDoInjection) => {
  if (process.platform === 'win32') {
    return require('./lib/windows-emit').launch(JustDoInjection);
  }

  throw new Error('macOS and Windows only');
};
