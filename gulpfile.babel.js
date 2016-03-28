var browserify = require('browserify'),
    gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    source = require('vinyl-source-stream'),
    browserSync = require('browser-sync');

/* pathConfig*/
var entryPoint = './src/js/index.js',
    browserDir = './',
    sassWatchPath = './src/styles/**/*.scss',
    jsWatchPath = './src/js/**/*.js',
    htmlWatchPath = './**/*.html';
/**/

gulp.task('js', function () {
    return browserify(entryPoint, {debug: true, extensions: ['es6']})
        .transform("babelify", {presets: ["es2015"]})
        .bundle()
        .pipe(source('index.js'))
        .pipe(gulp.dest('./dist/'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', function () {
    const config = {
        server: {baseDir: browserDir}
    };

    return browserSync(config);
});

gulp.task('sass', function () {
    return gulp.src(sassWatchPath)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist/'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('watch', function () {
    gulp.watch(jsWatchPath, ['js']);
    gulp.watch(sassWatchPath, ['sass']);
    gulp.watch(htmlWatchPath, function () {
        return gulp.src('')
            .pipe(browserSync.reload({stream: true}))
    });
});

gulp.task('run', ['js', 'sass', 'watch', 'browser-sync']);