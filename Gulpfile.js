'use strict';

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var when = require('gulp-if');
var shell = require('gulp-shell');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var bs = require('browser-sync');
var reload = bs.reload;
var src = './client/src';
var dest = './client/public';

var paths = {
  scripts: ['client/app/**/*.js'],
  html: ['client/app/**/*.html', 'client/index.html'],
  styles: ['client/styles/style.css'],
  app: {
    src: [
      src + '/app/users/users.js',
      src + '/app/devs/devs.js',
      src + '/app/projects/projects.js',
      src + '/app/nps/nps.js',
      src + '/app/nav/nav.js',
      src + '/app/landing/landing.js',
      src + '/app/services/lsKeys.js',
      src + '/app/services/users.js',
      src + '/app/services/devs.js',
      src + '/app/services/nps.js',
      src + '/app/services/projects.js',
      src + '/app/services/project.js',
      src + '/app/app.js'
    ],
    dest: dest + '/app'
  },
  vendor: {
    src: [
      src + '/lib/angular/angular.js',
      src + '/lib/angular-route/angular-route.js'
    ],
    dest: dest + '/lib'
  }
};

gulp.task('watch', function() {
  gulp.watch(paths.app.src, ['appScripts']);
  gulp.watch(paths.vendor.src, ['vendorScripts']);
});

gulp.task('appScripts', function() {
  return gulp.src(src)
    .pipe(concat('app.js'))
    .pipe(gulp.dest(dest))
    .pipe(rename('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(dest));
});

gulp.task('vendorScripts', function() {
  return gulp.src(src)
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest(dest))
    .pipe(rename('vendor.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(dest));
});

gulp.task('build', ['appScripts', 'vendorScripts']);

gulp.task('heroku:production', ['build']);

gulp.task('serve', function() {
  nodemon({
    script: 'app.js',
    ignore: 'node_modules/**/*.js',
    env: { 'NODE_ENV': 'development' },
    watch: ['./server/**/*.js', './client/**/*.js']
  });
});

gulp.task('start', ['serve'], function() {
  bs({
    notify: true,
    injectChanges: true,
    files: paths.scripts.concat(paths.html, paths.styles),
    proxy: 'localhost:8000'
  });
});

gulp.task('default', ['start']);
