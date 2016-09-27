# Prerequisites
Node v4.5.0

# Test demo example in production mode
* [sudo] npm install --production
* npm run start
* open in browser http://localhost:3000

# Development mode
* [sudo] npm install webpack -g
* [sudo] npm install gulp -g
* [sudo] npm install
* gulp
* npm run dev
* open in browser http://localhost:3000

# Compile app for production
## Compile static assets production
 * gulp (output in dev folder)
 * copy the files within dev folder to dest folder

## Compile only the app with webpack for production
  * npm run build_app (output in dest folder)
