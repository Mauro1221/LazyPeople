const autoprefixer = require('autoprefixer');
const cleanCSS = require('gulp-clean-css');
const gulp = require('gulp');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass');
const log = require('fancy-log');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

const CSS_DESTINATION = './static/css'
const SASS_PATTERN = './private/sass/*.{scss,sass}';
const JS_DESTINATION = './static/js'
const JS_PATTERN = './private/js/**/*.js';


/**
 * Usage:
 * - "gulp sass"
 */
function compileSass(done) {
    return gulp.src(SASS_PATTERN)
        .pipe(sass())
        .on('error', function (error) {
            log.error(
                'Error (' + error.plugin + '): ' + error.messageFormatted
            );
        })
        .pipe(cleanCSS())
        .pipe(
            postcss([
                autoprefixer({
                    // browsers are coming from browserslist file
                    cascade: false,
                }),
            ])
        )
        .pipe(gulp.dest(CSS_DESTINATION));
    done();
}

function watchSass() {
    return gulp.watch(SASS_PATTERN, gulp.series('sass'));
}

/**
 * Usage:
 * - "gulp compile"
 */
function compileJS(done) {
    return gulp.src(JS_PATTERN)
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(concat('base.js'))
        .pipe(gulp.dest(JS_DESTINATION))
        .pipe(uglify())
        .pipe(gulp.dest(JS_DESTINATION));
    done();
}

function watchJS() {
    return gulp.watch(JS_PATTERN, gulp.series('compile'));
}

exports.watch = gulp.series(watchSass, watchJS);
exports.sass = compileSass;
exports.build = gulp.series(compileSass, compileJS);
exports.compile = compileJS;
exports.default = gulp.series(compileSass, watchSass, compileJS, watchJS);