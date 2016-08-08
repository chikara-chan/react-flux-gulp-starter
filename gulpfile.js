var gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  minifyCss = require('gulp-clean-css'),
  rename = require('gulp-rename'),
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),
  del = require('del'),
  browserSync = require('browser-sync'),
  gutil = require('gulp-util'),
  webpack = require('webpack'),
  webpackConfig = require('./webpack.config.js'),
  webpackCompiler = webpack(webpackConfig);

gulp.task('clean', function() {
  del(['./build/*.css', './build/*.js'], {
    force: true
  });
});

gulp.task('style', function() {
  gulp.src(['./css/sass/*.scss', '!./css/sass/_*.scss'])
    .pipe(sass())
    .pipe(rename(function(path) {
      path.dirname += '';
      path.basename += '';
      path.extname = '.css'
    }))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe(gulp.dest('./build'))
    .pipe(minifyCss())
    .pipe(rename(function(path) {
      path.basename = path.basename + '.min';
    }))
    .pipe(gulp.dest('./build'))
});

gulp.task('webpack', function(callback) {
  webpackCompiler.run(function(err, stats) {
    if (err) throw new gutil.PluginError('[webpack]', err);
    gutil.log('[webpack]', stats.toString({
      colors: true
    }));
    callback();
  });
});

gulp.task('script', ['webpack'], function() {
  gulp.src(['./build/*.js', '!./build/*.min.js'])
    .pipe(uglify())
    .pipe(rename(function(path) {
      path.basename = path.basename + '.min';
    }))
    .pipe(gulp.dest('./build'))
});

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: './'
    },
    notify: false,
    startPath: '/demo/refund-apply.html'
  });
  gulp.watch(['build/**','demo/**']).on('change', function(file) {
    browserSync.reload(file.path);
  });
});

gulp.task('watch', function() {
  gulp.watch(['./css/**/*.scss'], ['style']);
  gulp.watch(['./js/**/*.js'], ['script']);
});

gulp.task('build', ['clean', 'style', 'script']);

gulp.task('default', ['build', 'watch', 'browser-sync']);

module.exports = gulp;