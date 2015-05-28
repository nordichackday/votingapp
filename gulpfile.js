// Include gulp
var gulp = require('gulp'); 

// Include Our Plugins
var gutil = require('gulp-util');
var plumber = require('gulp-plumber');
var jshint = require('gulp-jshint');
var less = require('gulp-less');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var react = require('gulp-react');


var onError = function (err) {  
  gutil.beep();
  console.log(err);
};

// React Task
gulp.task('react', function() {
    return gulp.src('src/react/*.js')
        .pipe(plumber())
    	.pipe(react())
         .on('error', gutil.log)
        .pipe(gulp.dest('public/build/react'));
});

// Compile Our Less
gulp.task('less', function() {
    return gulp.src('src/less/*.less')
        .pipe(plumber())
        .pipe(less())
         .on('error', gutil.log)
        .pipe(gulp.dest('public/build/css'));
});


// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});


// Watch Files For Changes
gulp.task('watch', function() {
    //gulp.watch('js/*.js', ['lint', 'scripts']);
    gulp.watch('src/react/*.js', ['react']);
    gulp.watch('src/less/*.less', ['less']);
});

// Default Task
gulp.task('default', ['watch']);



