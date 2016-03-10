"use strict"

var gulp = require('gulp');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
var webserver = require('gulp-webserver');
var exec = require('gulp-exec');
var fs = require('fs');

gulp.task('run', ['compile', 'createBabelConfig', 'webserver', 'watch']);

gulp.task('createBabelConfig', function () {
    fs.exists('.babelrc', function (ex) {
        if (!ex)
           return gulp.src('')
                    .pipe(exec("echo {'presets': ['es2015'] } > .babelrc"));
    });
});

gulp.task('compile', ['javascript', 'sass']);

gulp.task("javascript", function () {
    return gulp.src("./scripts/*.js")
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest("./public/scripts"));
});

gulp.task('sass', function () {
    return gulp.src('styles/**/*.scss')
        .pipe(sass({
            includePaths: ['styles']
        }))
        .pipe(prefix(['last 2 versions'], { cascade: true }))
        .pipe(gulp.dest('./public/styles'));
});

gulp.task('webserver', function () {
    gulp.src('')
        .pipe(webserver({
            livereload: true,
            open: true
        }));
});

gulp.task('watch', function () {
    gulp.watch('styles/**/*.scss', ['sass']);
    gulp.watch('./scripts/*.js', ['javascript']);
});