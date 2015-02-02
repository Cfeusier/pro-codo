var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var minCss = require("gulp-minify-css");
var bs = require('browser-sync');
var src = './client/src';
var dest = './client/public';

var paths = {
  app: {
    src: [
      src + '/app/ctrls/users.js',
      src + '/app/ctrls/devs.js',
      src + '/app/ctrls/projects.js',
      src + '/app/ctrls/nps.js',
      src + '/app/ctrls/nav.js',
      src + '/app/ctrls/landing.js',
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
  css: {
    src: [
      src + '/lib/font-awesome/css/font-awesome.min.css',
      src + '/assets/styles/**/{*.css, _*.css}'
    ],
    dest: dest + '/assets/styles'
  },
  vendor: {
    src: [
      src + '/lib/angular/angular.js',
      src + '/lib/angular-route/angular-route.js'
    ],
    dest: dest + '/lib'
  },
  templates: {
    src: src + '/app/templates/**/*.html',
    dest: dest + '/app/templates'
  },
  fonts: {
    src: [
      src + '/lib/font-awesome/fonts/**/*.eot',
      src + '/lib/font-awesome/fonts/**/*.svg',
      src + '/lib/font-awesome/fonts/**/*.ttf',
      src + '/lib/font-awesome/fonts/**/*.woff',
      src + '/lib/font-awesome/fonts/**/*.woff2',
      src + '/lib/font-awesome/fonts/**/*.otf'
    ],
    dest: dest + '/assets/fonts'
  },
  index: {
    src: src + '/index.html',
    dest: dest + '/'
  },
  browserSync: {
    proxy: 'http://localhost:8000'
  },
  nodeDemon: {
    script: 'app.js',
    env: { 'NODE_ENV': 'development' },
    ignore: ['./gulp/**/*', './node_modules/**/*'],
    watch: ['./server/**/*.js', './client/**/*.js']
  }
};

gulp.task('browserSync', ['build', 'nodeDemon'], function () {
  bs.init(null, paths);
});

gulp.task('nodeDemon', function() {
  nodemon(paths.nodeDemon);
});

gulp.task('reload', function() {
  bs.reload();
});

gulp.task('watch', ['browserSync'], function() {
  gulp.watch(paths.fonts.src, ['fonts', 'reload']);
  gulp.watch(paths.css.src, ['styles', 'reload']);
  gulp.watch(paths.app.src, ['appScripts', 'reload']);
  gulp.watch(paths.vendor.src, ['vendorScripts', 'reload']);
  gulp.watch(paths.templates.src, ['templates', 'reload']);
  gulp.watch(paths.index.src, ['index', 'reload']);
});

gulp.task('styles', function () {
  return gulp.src(paths.css.src)
    .pipe(concat('styles.css'))
    .pipe(gulp.dest(paths.css.dest))
    .pipe(rename('styles.min.css'))
    .pipe(minCss())
    .pipe(gulp.dest(paths.css.dest));
});

gulp.task('appScripts', function() {
  return gulp.src(paths.app.src)
    .pipe(concat('app.js'))
    .pipe(gulp.dest(paths.app.dest))
    .pipe(rename('app.min.js'))
    .pipe(uglify({ mangle: false }))
    .pipe(gulp.dest(paths.app.dest));
});

gulp.task('vendorScripts', function() {
  return gulp.src(paths.vendor.src)
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest(paths.vendor.dest))
    .pipe(rename('vendor.min.js'))
    .pipe(uglify({ mangle: false }))
    .pipe(gulp.dest(paths.vendor.dest));
});

gulp.task('fonts', function() {
  return gulp.src(paths.fonts.src)
    .pipe(gulp.dest(paths.fonts.dest));
});

gulp.task('index', function() {
  return gulp.src(paths.index.src)
    .pipe(gulp.dest(paths.index.dest));
});

gulp.task('templates', function() {
  return gulp.src(paths.templates.src)
    .pipe(gulp.dest(paths.templates.dest));
});

gulp.task('build', [
  'fonts',
  'styles',
  'appScripts',
  'vendorScripts',
  'templates',
  'index'
]);

gulp.task('default', ['watch']);
