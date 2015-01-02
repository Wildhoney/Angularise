(function() {

    var yaml   = require('js-yaml'),
        fs     = require('fs');

    /**
     * @property {Object} config
     * @property {String} config.components
     */
    var config = yaml.safeLoad(fs.readFileSync('angularise.yml', 'utf8'));

    var gulp   = require('gulp'),
        uglify = require('gulp-uglify'),
        rename = require('gulp-rename'),
        jshint = require('gulp-jshint'),
        watch  = require('gulp-watch'),
        concat = require('gulp-concat');

    gulp.task('scripts', function gulpBuild() {

        gulp.src(config.components)
            .pipe(rename(config.build.development))
            .pipe(gulp.dest(config.build.copy))
            .pipe(rename(config.build.production.unminified))
            .pipe(gulp.dest('dist'))
            .pipe(uglify())
            .pipe(rename(config.build.production.minified))
            .pipe(gulp.dest('dist'));

    });

    gulp.task('hint', function gulpHint() {

        return gulp.src(config.components)
            .pipe(jshint('.jshintrc'))
            .pipe(jshint.reporter('default'));

    });

    gulp.task('test', ['hint']);
    gulp.task('build', ['scripts']);
    gulp.task('default', ['test', 'build']);
    gulp.task('watch', function watch() {
        gulp.watch('module/*', ['build']);
    });

})();