const gulp = require('gulp');
const babel = require('gulp-babel');
const del = require('del');

// cleanup the dist folder
gulp.task('default',function () {
    del(['./dist/**/*']).then(()=>{
        gulp.start('tasks');
    })
});

gulp.task('tasks',[
    'compile',
    'copy'
]);

gulp.task('compile', function(cb) {
    gulp.src('./src/**/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('./dist/'));

    cb();
});

gulp.task('copy', function(cb) {
    gulp.src('./src/env.json')
        .pipe(gulp.dest('./dist/'));

    cb();
});
