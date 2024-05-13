const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));


function build(){
    return src('../../assets/styles/scss/*.scss')
    .pipe(sass())
    .pipe(dest('../../assets/styles/css'))
}

function watchScss(){
    watch(['../../assets/styles/scss/*.scss'])
}
exports.default = series(build, watchScss)