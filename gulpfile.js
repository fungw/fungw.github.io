var gulp = require('gulp');
var coffee = require('gulp-coffee');
var stylus = require('gulp-stylus');

gulp.task('coffee', function() {
	gulp.src('./modules/*/*.coffee')
		.pipe(coffee({bare: true}))
		.pipe(gulp.dest('./public/'));
	gulp.src('./core/*.coffee')
		.pipe(coffee({bare: true}))
		.pipe(gulp.dest('./core/'));
});

gulp.task('stylus', function() {
  gulp.src('./modules/*/*.styl')
  	.pipe(stylus())
  	.pipe(gulp.dest('./public/'));
});

 gulp.task('default', ['coffee', 'stylus']);