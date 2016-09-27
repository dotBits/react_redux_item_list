#!/usr/bin/env node

"use strict";
process.env.TMPDIR = 'tmp'; // to avoid the EXDEV rename error, see http://stackoverflow.com/q/21071303/76173

const __cwd = process.cwd(),
      path = require("path"),
      express = require('express'),
      config = require('./config/environments'),
      bodyParser = require('body-parser'),
      compression = require('compression'),
      USERS = require('./users_250'),
      app = express();


app.use(compression());
app.use(bodyParser.json({limit: '18mb'}));
app.disable('x-powered-by');

//------------------------------------------------------------------------------------------------------------------------
// PAGE RENDER ENGINE SETTINGS
//------------------------------------------------------------------------------------------------------------------------
app.set('view engine', 'pug');
app.set('views', __cwd + '/server/');


//------------------------------------------------------------------------------------------------------------------------
// WEBPACK DEVELOPMENT SETTINGS
//------------------------------------------------------------------------------------------------------------------------
if(process.env.NODE_ENV === 'development') {
  const webpack = require('webpack'),
        webpackDevMiddleware = require('webpack-dev-middleware'),
        webpackHotMiddleware = require('webpack-hot-middleware'),
        webpackConfig = require('../webpack.config'),
        compiler = webpack(webpackConfig);

  app.use(webpackDevMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
      stats: {colors: true}
  }))

  app.use(webpackHotMiddleware(compiler, {
    log: console.log
  }))
}
app.use('/', express.static( path.join(__cwd, config.env_path) ) );


//------------------------------------------------------------------------------------------------------------------------
// ROUTES
//------------------------------------------------------------------------------------------------------------------------
app.get('/', function(req, res) {
  if(process.env.NODE_ENV === 'development')
    res.render('views/index.pug', {});
  else if(process.env.NODE_ENV === 'production')
    res.render('views/index.pug', {});
});



app.post('/api/v1/users/list', function(req, res) {
  let retHash = {users: Array.from(USERS), _results:0, _matches:0, message: "User list loaded"},
      i,
      xhrOffset = 0,
      xhrLimit = 1000,
      xhrSorter = 'users.name ASC';

  if(req.body.pagination) {
    if(req.body.pagination.limit) { xhrLimit = req.body.pagination.limit }
    if(req.body.pagination.offset) { xhrOffset = req.body.pagination.offset }
  }

  if(req.body.filters) {
     if(req.body.filters.name)
      if(req.body.filters.name.length>0)
        retHash.users = retHash.users.filter((x) => { return (x.name.indexOf(req.body.filters.name) !== -1) })

    if(req.body.filters.email)
     if(req.body.filters.email.length>0)
       retHash.users = retHash.users.filter((x) => { return (x.email.indexOf(req.body.filters.email) !== -1) })

    if((req.body.filters.user_status_ids) && (req.body.filters.user_status_ids.length > 0))
      retHash.users = retHash.users.filter((x) => { return (req.body.filters.user_status_ids.indexOf(x.user_status_id) !== -1) })

    if((req.body.filters.user_role_ids) && (req.body.filters.user_role_ids.length > 0))
      retHash.users = retHash.users.filter((x) => { return (req.body.filters.user_role_ids.indexOf(x.user_role_id) !== -1) })

    if(req.body.filters.sorter)
      xhrSorter = req.body.filters.sorter;
  }

  retHash.users = retHash.users.sort(function (a, b) {
    switch(xhrSorter) {
      case 'users.name ASC':
      default:
        return a.name.localeCompare(b.name);
    }
  });

  switch(xhrSorter) {
    case 'users.name DESC':
      retHash.users = retHash.users.reverse();
      break;
  }

  retHash._matches = retHash.users.length;

  retHash.users.slice(xhrOffset, xhrLimit);
  retHash.users = retHash.users.slice(xhrOffset, xhrLimit);

  for(i=0; i<retHash.users.length; i++) {
    retHash.users[i]._checked = false;

    if(retHash.users[i].user_status_id === 1)
      retHash.users[i]._user_status_name = 'Active';
    else
      retHash.users[i]._user_status_name = 'Disabled';

    if(retHash.users[i].user_role_id === 1)
      retHash.users[i]._user_role_name = 'Admin';
    else if(retHash.users[i].user_role_id === 101)
      retHash.users[i]._user_role_name = 'Manager';
    else if(retHash.users[i].user_role_id === 201)
      retHash.users[i]._user_role_name = 'User';
  }

  retHash._results = retHash.users.length;
  res.json(retHash);
});

app.post('/api/v1/users-status/list', function(req, res) {
  const retHash = {user_status: [{id:1, name:'Active'}, {id:101, name:'Disabled'}], message: "User status list loaded"};
  res.json(retHash);
});

app.post('/api/v1/users-roles/list', function(req, res) {
  const retHash = {
    user_roles:[
      {id:1, name:'Admin'},
      {id:101, name:'Manager'},
      {id:201, name:'User'}
    ],
    message: "User status list loaded"
  };

  res.json(retHash);
});

app.post('/api/v1/users', function(req, res) {
  res.status(400).json({message: "Not available. This is only a demo"});
});

app.post('/api/v1/users/bulk-delete', function(req, res) {
  res.status(400).json({message: "Not available. This is only a demo"});
});

//------------------------------------------------------------------------------------------------------------------------
// START SERVER
//------------------------------------------------------------------------------------------------------------------------
app.listen(config.expressPort, () => {
  if(process.env.NODE_ENV === 'development') {
    console.log(process.env.NODE_ENV, 'mode');
    console.log(`Listening on port ${config.expressPort}`);
  }
});
