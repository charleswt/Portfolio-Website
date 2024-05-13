const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));


function build(){
    return src('../../assets/styles/sass/*.scss')
    .pipe(sass())
    .pipe(dest('css'))
}

function watch(){
    watch(['../../assets/styles/sass/*.scss'])
}
exports.default = series(build, watch)