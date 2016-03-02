"use strict"

var gulp = require('gulp');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('run', ['watch', 'compile']);

gulp.task('compile', ['javascript', 'sass']);

gulp.task("javascript", function(){
    return gulp.src("./scripts/*.js")
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest("./public/scripts"));
});

/**
 * Compile files from _scss into both _site/css (for live injecting) and site (for future jekyll builds)
 */
gulp.task('sass', function () {
    return gulp.src('styles/**/*.scss')
        .pipe(sass({
            includePaths: ['styles']
        }))
        .pipe(prefix(['last 2 versions'], { cascade: true }))
        .pipe(gulp.dest('./public/styles'));
});

/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
    gulp.watch('styles/**/*.scss', ['sass']);
    gulp.watch('./scripts/**/*.js', ['javascript']);
});