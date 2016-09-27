# Prerequisites
Node v4.5.0

# Test demo app in Production mode
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
 * gulp (output in __dev__ folder)
 * copy the files within __dev__ folder to __dest__ folder

## Compile only the app with webpack for production
  * npm run build_app (output already in __dest__ folder)
