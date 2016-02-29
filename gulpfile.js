var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var prefix      = require('gulp-autoprefixer');
var cp          = require('child_process');
var ghPages     = require('gulp-gh-pages');

var concat = require('gulp-concat');
var babelify = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

var jekyll   = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';
var messages = {
    jekyllBuild: '<span style="color: grey">Running:</span> $ jekyll build'
};

/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', function (done) {
    browserSync.notify(messages.jekyllBuild);
    return cp.spawn( jekyll , ['build'], {stdio: 'inherit'})
        .on('close', done);
});

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browserSync.reload();
});

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['sass', /*'jekyll-build'*/], function() {
    browserSync.init({
        server: {
            baseDir: '_site'
        }
    });
});

gulp.task('js', ['js:vendor', 'js:app']);

/**
 * Compile files from _scss into both _site/css (for live injecting) and site (for future jekyll builds)
 */
gulp.task('sass', function () {
    return gulp.src('styles/**/*.scss')
        .pipe(sass({
            includePaths: ['styles'],
            onError: browserSync.notify
        }))
        .pipe(prefix(['last 2 versions'], { cascade: true }))
        .pipe(gulp.dest('_site/public/styles'))
        .pipe(browserSync.reload({stream:true}))
        .pipe(gulp.dest('public/styles'));
});

// Собираем JS
gulp.task('js:app', () => {
  const bundler = browserify('./scripts/main.js');

    bundler.transform(babelify.configure({
        "presets": ["es2015"]
    }));

    bundler.bundle()
        .on('error', function (err) { console.error(err); })
        .pipe(source('main.js'))
        .pipe(gulp.dest('./_site/public/scripts'));
});

gulp.task('js:vendor', () => {

    return gulp.src(['./node_modules/jquery/dist/jquery.min.js', './node_modules/bootstrap/dist/js/bootstrap.min.js'])
        .pipe(concat('vendors.js'))
        .pipe(gulp.dest('./_site/public/scripts/'));
});


/**
 * Watch scss files for changes & recompile
 * Watch html/md files, run jekyll & reload BrowserSync
 */
gulp.task('watch', function () {
    gulp.watch('styles/**/*.scss', ['sass']);
    gulp.watch([
        '**/*.html',
        '_layouts/*.html',
        '!_site/**/*.html'
    ], ['jekyll-rebuild']);
});

/**
 * Default task, running just `gulp` will compile the sass,
 * compile the jekyll site, launch BrowserSync & watch files.
 */
gulp.task('default', ['js:vendor', 'js:app' , 'browser-sync']);


/**
 * Deploy task, deploying site to gh-pages
 */
gulp.task("deploy", ["jekyll-build"], function () {
    return gulp.src("./_site/**/*")
        .pipe(ghPages());
});
