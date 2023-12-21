const gulp = require("gulp");
const babel = require('gulp-babel');
const rigger = require("gulp-rigger");
const rename = require("gulp-rename");
const babili = require("gulp-babel-minify");
const copy = () => {
    return gulp
        .src("src/*.js")
        .pipe(rigger())
        .pipe(rename({
            basename: "glottologist"
        }))
        .pipe(gulp.dest("dist"));
};

const minify = () => {
    return gulp
        .src("src/*.js")
        .pipe(rigger())
        .pipe(babili({
            mangle: {
                keepClassName: true
            }
        }))
        .pipe(rename({
            basename: "glottologist",
            suffix: ".min"
        }))
        .pipe(gulp.dest("dist"));
}

const es5 = () => {
    return gulp
        .src("src/*.js")
        .pipe(rigger())
        .pipe(babel({presets: ['@babel/env']}))
        .pipe(babili({
            mangle: {
                keepClassName: true
            }
        }))
        .pipe(rename({
            basename: "glottologist",
            suffix: ".es5.min"
        }))
        .pipe(gulp.dest("dist"));
};
const test = () => {
    return gulp
        .src("src/*.js")
        .pipe(rigger())
        .pipe(rename({
            basename: "glottologist"
        }))
        .pipe(gulp.dest("__test__"));
};
exports.copy = copy;
exports.minify = minify;
exports.es5 = es5;
exports.test = test;
exports.default = gulp.parallel(copy, minify, es5, test);
