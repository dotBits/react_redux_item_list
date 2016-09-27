'use strict';

const P = require('./package.json'),
      gulp = require('gulp'),
      uglify = require('gulp-uglify'),
      config = require('./server/config/environments'),
      gutil = require('gulp-util'),
      less = require('gulp-less'),
      path = require('path'),
      minifyCSS = require('gulp-minify-css'),
      concat = require('gulp-concat');

const appSrcDir = './client/',
      appLessDir = appSrcDir + 'less/';

let appDest = {
  root: './dev/',
  get app() {return this.root + 'app/'},
  get css() {return this.root + 'css/'},
  get js() {return this.root + 'app/'},
  get fonts() {return this.root + 'fonts/'},
}

const R = {
  vendor:{
    js: [
      "./node_modules/jquery/dist/jquery.js",
      "./node_modules/bootstrap/dist/js/bootstrap.js",
      "./node_modules/notie/dist/notie.js"
    ],
    css: [
      "./node_modules/bootstrap/dist/css/bootstrap.css",
      "./node_modules/notie/dist/notie.css",
      "./node_modules/react-select/dist/react-select.css"
    ],
    fonts: [
      "./node_modules/bootstrap/fonts/glyphicons-halflings-regular.eot",
      "./node_modules/bootstrap/fonts/glyphicons-halflings-regular.woff2",
      "./node_modules/bootstrap/fonts/glyphicons-halflings-regular.woff",
      "./node_modules/bootstrap/fonts/glyphicons-halflings-regular.ttf",
      "./node_modules/bootstrap/fonts/glyphicons-halflings-regular.svg",
    ]
  }
}

gulp.task('less', function (event) {
  gutil.log( gutil.colors.cyan( 'Less compiling ...' ));

  return gulp.src([
    path.join(__dirname, appLessDir) + 'main.less',
    path.join(__dirname, appLessDir) + 'user_list_area.less',
    path.join(__dirname, appLessDir) + 'browsers.firefox.less'
  ])
  .pipe(less())
  .on('error', function(err) {
    gutil.log( gutil.colors.red('Less compiling task failed'));
    gutil.log(err.message);
    this.emit('end');
  })
  .pipe(minifyCSS({processImportFrom : ['!fonts.googleapis.com']}))
  .pipe(concat('app.bundle.css'))
  .pipe(gulp.dest( path.join(__dirname, appDest.css) ));
});

gulp.task('bundle_vendor_js', function (event) {

  return gulp.src(R.vendor.js)
  .pipe(concat('vendor.bundle.min.js'))
  .on('error', function(err) {
    gutil.log( gutil.colors.red('Vendor JavaScript concat task failed'));
    gutil.log(err.message);
    this.emit('end');
  })
  .pipe(uglify())
  .on('error', function(err) {
    gutil.log( gutil.colors.red('Vendor JavaScript minify task failed'));
    gutil.log(err.message);
    this.emit('end');
  })
  .pipe(gulp.dest( path.join(__dirname, appDest.js) ))
});


gulp.task('bundle_vendor_css', function (event) {
  return gulp.src(R.vendor.css)
  .pipe(concat('vendor.bundle.min.css'))
  .on('error', function(err) {
    gutil.log( gutil.colors.red('Vendor CSS concat task failed'));
    gutil.log(err.message);
    this.emit('end');
  })
  .pipe(minifyCSS({keepSpecialComments: 0}))
  .on('error', function(err) {
    gutil.log( gutil.colors.red('Vendor CSS minify task failed'));
    gutil.log(err.message);
    this.emit('end');
  })
  .pipe(gulp.dest( path.join(__dirname, appDest.css) ))
  .pipe(gulp.dest( path.join(__dirname, appDest.css) ))

});


gulp.task('copy_vendor_fonts', function (event) {
  gutil.log( gutil.colors.cyan( 'Vendor Fonts copy task start ...' ));

  return gulp.src(R.vendor.fonts)
          .pipe(gulp.dest(path.join(__dirname, appDest.fonts) ))
          .on('end', function() {
            gutil.log( gutil.colors.cyan('Vendor Fonts copy task finished'));
          });
});


gulp.task('default', [
  'less',
  'bundle_vendor_js',
  'bundle_vendor_css',
  'copy_vendor_fonts'
]);
