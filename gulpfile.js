'use strict';

var     gulp = require('gulp'),
      concat = require('gulp-concat'),
      uglify = require('gulp-uglify'),
      rename = require('gulp-rename'),
        sass = require('gulp-sass'),
autoprefixer = require('gulp-autoprefixer'),
   minifycss = require('gulp-minify-css'),
  sourcemaps = require('gulp-sourcemaps'),
         del = require('del');

gulp.task('concatScripts', function() {
  return gulp.src(['js/main.js'])
             .pipe(sourcemaps.init())
             .pipe(concat('app.js'))
             .pipe(sourcemaps.write('./'))
             .pipe(gulp.dest('js'))
});

gulp.task('minifyScripts', ['concatScripts'], function() {
  return gulp.src('js/app.js')
             .pipe(uglify())
             .pipe(rename('app.min.js'))
             .pipe(gulp.dest('js'));
});

gulp.task('compileSass', function() {
  return gulp.src('scss/main.scss')
             .pipe(sourcemaps.init())
             .pipe(sass())
             .pipe(autoprefixer(['last 2 versions', 'safari 5', 'ie6', 'ie7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']))
             .pipe(rename('app.css'))
             .pipe(sourcemaps.write('./'))
             .pipe(gulp.dest('css'));
});

gulp.task('minifyCSS', ['compileSass'], function() {
  return gulp.src('css/app.css')
             .pipe(minifycss())
             .pipe(rename('app.min.css'))
             .pipe(gulp.dest('css'));
})

gulp.task('watch', function() {
  gulp.watch('scss/**/*.scss', ['compileSass']);
  gulp.watch('js/main.js', ['concatScripts']);
});

gulp.task('clean', function() {
  del(['dist', 'css/app*.css*', 'js/app*.js*']);
});

gulp.task('build', ['minifyScripts', 'minifyCSS'], function() {
  return gulp.src(['css/app.css', 'js/app.js', 'index.html', 'img/**'], { base: './' })
             .pipe(gulp.dest('dist'));
});

gulp.task('serve', ['watch']);

gulp.task('default', ['clean'], function() {
  gulp.start('build');
});
