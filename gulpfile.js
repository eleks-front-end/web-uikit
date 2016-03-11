var gulp = require('gulp'),
    sass = require('gulp-sass'),
    prefix = require('gulp-autoprefixer'),
    babel = require('gulp-babel'),
    sourcemaps = require('gulp-sourcemaps'),
    webserver = require('gulp-webserver'),
    exec = require('gulp-exec'),
    argv = require('yargs').argv,
    fs = require('fs');

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
            livereload: argv.live,
            open: argv.open
        }));
});

gulp.task('watch', function () {
    gulp.watch('styles/**/*.scss', ['sass']);
    gulp.watch('./scripts/*.js', ['javascript']);
});