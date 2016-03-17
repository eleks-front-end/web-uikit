var gulp = require('gulp'),
    sass = require('gulp-sass'),
    prefix = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    webserver = require('gulp-webserver'),
    exec = require('gulp-exec'),
    argv = require('yargs').argv;

gulp.task('run', ['sass', 'webserver', 'watch']);

gulp.task('sass', function () {
    return gulp.src('styles/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: ['styles']
        }).on('error', sass.logError))
        .pipe(prefix(['last 2 versions'], { cascade: true }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public/styles'));
});

gulp.task('webserver', function () {
    gulp.src('')
        .pipe(webserver({
            livereload: argv['live-reload'],
            open: true
        }));
});

gulp.task('watch', function () {
    gulp.watch('styles/**/*.scss', ['sass']);
});