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
    'copy',
    'copy-frontend'
]);

gulp.task('compile', function(cb) {
    gulp.src(['./src/**/*.js', '!./src/frontend/**/*'])
        .pipe(babel())
        .on('error', console.error.bind(console))
        .pipe(gulp.dest('./dist/'));

    cb();
});

gulp.task('copy', function(cb) {
    gulp.src('./src/env.json')
        .pipe(gulp.dest('./dist/'));

    cb();
});

gulp.task('copy-frontend', function(cb) {
    gulp.src(['./src/frontend/dist/**/*', '!./src/frontend/dist/**/*.map '])
        .pipe(gulp.dest('./dist/frontend/'));

    cb();
});
