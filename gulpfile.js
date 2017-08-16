const gulp = require('gulp')
const concat = require('gulp-concat')
const through = require('through2').obj

gulp.task('default', () => {
    gulp.src('./guacamole-common-js/src/main/webapp/modules/*.js')
        .pipe(concat('guacamole.js'))
        .pipe(through(function(file, enc, cb) {
            let buff = new Buffer(file.contents.toString() + '\nmodule.exports = Guacamole;\n\n')
            let f = file.clone()

            f.contents = buff
            this.push(f)
            cb()
        }))
        .pipe(gulp.dest('./dist'))
});

