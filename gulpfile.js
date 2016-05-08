var gulp = require('gulp');
var clean = require('gulp-clean');
var jshint = require('gulp-jshint');
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var minify = require('gulp-minifier');
var sass = require('gulp-sass');
var chmod = require('gulp-chmod');

var bases = {
    app: 'app/',
    dist: 'dist/'
};

gulp.task('clean', function() {
    return gulp.src(bases.dist)
        .pipe(chmod(755))
        .pipe(clean());
});

gulp.task('prefix', ['clean'], function () {
    return gulp.src('dist/styles/style.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(chmod(755))
        .pipe(gulp.dest('dist/styles/'));
});

gulp.task('copy', ['clean'], function() {
    gulp.src('**', {cwd: bases.app})
        .pipe(chmod(755))
        .pipe(gulp.dest(bases.dist));
});

gulp.task('sass',['clean'], function () {
    gulp.src('app/styles/scss/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(chmod(755))
        .pipe(gulp.dest('dist/styles'));
});

gulp.task('scripts', ['clean'], function() {
    gulp.src(['app/**/*','bower_components/requirejs/require.js'])
        .pipe(minify({
            minify: true,
            collapseWhitespace: true,
            conservativeCollapse: true,
            minifyJS: true,
            minifyCSS: true
        }))
        .pipe(chmod(755))
        .pipe(gulp.dest('dist'));
});



gulp.task('watch', function () {
    gulp.watch('app/**/*', ['clean','scripts','sass','prefix']);
});

gulp.task('lifeweb', ['clean','scripts','sass','prefix']);