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

var paths = {
  src: './client/src',
  dest: './client/public',
  scripts: ['client/app/**/*.js'],
  html: ['client/app/**/*.html', 'client/index.html'],
  styles: ['client/styles/style.css'],
  app: {
    src: [
      paths.src + '/app/users/users.js',
      paths.src + '/app/devs/devs.js',
      paths.src + '/app/projects/projects.js',
      paths.src + '/app/nps/nps.js',
      paths.src + '/app/nav/nav.js',
      paths.src + '/app/landing/landing.js',
      paths.src + '/app/services/lsKeys.js',
      paths.src + '/app/services/users.js',
      paths.src + '/app/services/devs.js',
      paths.src + '/app/services/nps.js',
      paths.src + '/app/services/projects.js',
      paths.src + '/app/services/project.js',
      paths.src + '/app/app.js'
    ],
    dest: paths.dest + '/app'
  },
  vendor: {
    src: [
      paths.src + '/lib/angular/angular.js',
      paths.src + '/lib/angular-route/angular-route.js'
    ],
    dest: paths.dest + '/lib'
  }
};

gulp.task('watch', function() {
  gulp.watch(paths.app.src, ['appScripts']);
  gulp.watch(paths.vendor.src, ['vendorScripts']);
});

gulp.task('appScripts', function() {
  return gulp.src(paths.src)
    .pipe(concat('app.js'))
    .pipe(gulp.dest(paths.dest))
    .pipe(rename('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.dest));
});

gulp.task('vendorScripts', function() {
  return gulp.src(paths.src)
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest(paths.dest))
    .pipe(rename('vendor.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.dest));
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
