import fs from 'fs';
import source from 'vinyl-source-stream';
import del from 'del';
import gulp from 'gulp';
import browserify from 'browserify';
import watchify from 'watchify';
import buffer from 'vinyl-buffer';
import babelify from 'babelify';
import browserSync from 'browser-sync';
import uglify from 'gulp-uglify';
import htmlMin from 'gulp-htmlmin';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import autoprefixer from 'gulp-autoprefixer';
import gIf from 'gulp-if';
import watch from 'gulp-watch';
import cssNano from 'gulp-cssnano';
import sequence from 'gulp-sequence';
import util from 'gulp-util';
import plumber from 'gulp-plumber';
import shell from 'gulp-shell';
import packageJSON from './package.json';
import { argv } from 'yargs';

// Configurations.
const IS_DEV_MODE = argv.development;
const sourceDirectory = packageJSON.directories.src;
const destinationDirectory = packageJSON.directories.dist;

/**
 * Helper function to bundle the scripts using browserify
 * If in watch mode watchify is used for incremental building.
 *
 * @param  {Boolean} isWatchMode Are we in watching mode?
 * @return {Function}            Exposed bundler function.
 */
function runScriptsBundler (isWatchMode) {
    // Configuration.
    const config = {
        babel: JSON.parse(fs.readFileSync(`${__dirname}/.babelrc`, 'utf8')),
        browserify: {
            entries: `${sourceDirectory}/js/index.js`,
            debug: IS_DEV_MODE
        },
        uglify: {
            compress: {drop_debugger: !IS_DEV_MODE}
        }
    };

    // Browserify bundler instance with babelify transform.
    const browserifyInstance = browserify(config.browserify)
        .transform(babelify.configure(config.babel));

    // If in watch mode watchify module is used
    // to wrap the browserify instance for incremental building.
    const bundler = isWatchMode
        ? watchify(browserifyInstance) : browserifyInstance;

    // Bundler function responsible for stream processing.
    function rebundle() {
        // Browserify stream to be processed.
        const stream = bundler.bundle();

        // Return processed stream.
        return stream
            .on('error', error => {
                util.beep();
                console.log(error); // eslint-disable-line no-console
                this.emit('end');
            })
            .pipe(source('index.js'))
            //.pipe(gIf(IS_DEV_MODE, sourcemaps.init()))
            .pipe(gIf(!IS_DEV_MODE, buffer()))
            .pipe(gIf(!IS_DEV_MODE, uglify(config.uglify)))
            //.pipe(gIf(IS_DEV_MODE, sourcemaps.write()))
            .pipe(gulp.dest(destinationDirectory))
            .pipe(gIf(IS_DEV_MODE, browserSync.reload({stream: true})));
    }

    // Bundle on changes.
    bundler.on('update', () => {
        rebundle();
    });

    // Return bundler function.
    return rebundle();
}

// Development task.
gulp.task('default', callback =>
    sequence(
        'clean',
        ['build:html', 'build:sass', 'build:svg', 'build:js:watch'],
        ['watch', 'browsersync'],
        callback
    )
);

// Production task.
gulp.task('build', callback =>
    sequence(
        'clean',
        ['build:html', 'build:sass', 'build:svg', 'build:js'],
        'server', callback
    )
);

// Keeps changes in sync with the browser.
gulp.task('browsersync', () => {
    // Configuration.
    const config = {
        server: {baseDir: `${destinationDirectory}`}
    };

    return browserSync(config);
});

// Deletes the build folder.
gulp.task('clean', callback => {
    const paths = [destinationDirectory];
    return del(paths, callback);
});

// Concats SVG image files to a single SVG sprite with a CSS stylesheet.
gulp.task('build:svg', () => {
    // Configuration.
    const config = {
        mode: {
            css: {
                dest: `${destinationDirectory}/..`,
                bust: false,
                prefix: '.img-%s',
                sprite: 'images.svg',
                render: {css: {dest: 'images.css'}}
            }
        }
    };

    return gulp.src(`${sourceDirectory}/svg/**/*.svg`)
        .pipe(plumber())
        .pipe(gulp.dest(destinationDirectory))
        .pipe(gIf(IS_DEV_MODE, browserSync.reload({stream: true})));
});

// Minifies the HTML file and clones it to destination folder.
gulp.task('build:html', () => {
    // Configuration.
    const config = {
        removeComments: true,
        collapseWhitespace: true
    };

    return gulp.src(`${sourceDirectory}/html/**/*.html`)
        .pipe(plumber())
        .pipe(htmlMin(config))
        .pipe(gulp.dest(destinationDirectory))
        .pipe(gIf(IS_DEV_MODE, browserSync.reload({stream: true})));
});

// Compiles modular JS written in ES6 down to ES5 with
// babelify transform, which allows us to write modular ES6.
// Result is a single file compiled to
// ES5 with all required dependecies resolved.
gulp.task('build:js', () => runScriptsBundler(false));

// Same task as above but in watch mode for incremental building.
gulp.task('build:js:watch', ['build:js'], () => runScriptsBundler(true));

// Concats and auto-prefixes the stylesheets.
gulp.task('build:sass', () => {
    // Configuration.
    const config = {
        autoprefixer: {browsers: ['last 2 versions']},
        sass: {sourcemap: true, style: 'compact'}
    };

    return gulp.src(`${sourceDirectory}/styles/*.scss`)
        .pipe(plumber())
        .pipe(gIf(IS_DEV_MODE, sourcemaps.init()))
        .pipe(sass(config.sass))
        .pipe(autoprefixer(config.autoprefixer))
        .pipe(gIf(!IS_DEV_MODE, cssNano()))
        .pipe(gIf(IS_DEV_MODE, sourcemaps.write()))
        //.pipe(concat('styles.css'))
        .pipe(gulp.dest(destinationDirectory))
        .pipe(gIf(IS_DEV_MODE, browserSync.reload({stream: true})));
});

// Run local server for the build files.
gulp.task('server', shell.task([
    `./node_modules/.bin/http-server ${destinationDirectory}`,
]));

// Watches for file changes and run specific tasks.
// Script watching is already done by watchify.
gulp.task('watch', ['browsersync'], () => {
    // HTML document.
    watch(
        `${sourceDirectory}/html/**/*.html`,
        () => gulp.start('build:html')
    );

    // Styles.
    watch(
        `${sourceDirectory}/styles/**/*.{sass,scss,css}`,
        () => gulp.start('build:sass')
    );

    // Images.
    watch(
        `${sourceDirectory}/svg/**/*.svg`,
        () => gulp.start('build:svg')
    );
});
