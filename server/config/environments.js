"use strict";

const envBasePath = Object.freeze({dev:'dev/', prod:'dest/'});

module.exports = function() {
  switch(process.env.NODE_ENV){
    case null:
    case undefined:
    case 'development':
      return {
        env: 'dev',
        loggerLevel: 'info',
        expressPort: process.env.PORT || 3000,
        env_path: envBasePath.dev,
      };
      break;

    case 'production':
      return {
        env: 'dest',
        loggerLevel: 'info',
        expressPort: process.env.PORT || 3000,
        env_path: envBasePath.prod,
      };
      break;
    default:
      throw new Error('Environment Not Recognized');
  }
}();
