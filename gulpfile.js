var gulp = require('gulp')

var jshint = require('gulp-jshint')
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var minifyHTML = require('gulp-minify-html');
var concat = require('gulp-concat');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');
var autoprefix = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var sass = require('gulp-sass');
var connect = require('gulp-connect');

// gulp.task('default', ['jshint', 'imagemin', 'htmlpage', 'scripts', 'styles', 'sass', 'webserver'], function() {
// });

gulp.task('default', ['jshint', 'imagemin', 'htmlpage', 'scripts', 'styles', 'sass', 'webserver'], function() {
	gulp.watch('./src/*.html', function() {
		gulp.start('htmlpage');
		});

	gulp.watch('./src/scripts/*.js', function() {
		gulp.start('jshint', 'scripts');
	});

	gulp.watch('./src/styles/*.scss', function() {
		gulp.start('styles', 'sass');
	});
});

gulp.task('jshint', function(){
	gulp.src('./src/scripts/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('imagemin', function() {
	var imgSrc = './src/images/**/*',
			imgDst = './build/images';

	gulp.src(imgSrc)
		.pipe(changed(imgDst))
		.pipe(imagemin())
		.pipe(gulp.dest(imgDst));
});

gulp.task('htmlpage', function() {
	var htmlSrc = './src/*.html',
			htmlDst = './build';

	gulp.src(htmlSrc)
		.pipe(changed(htmlDst))
		.pipe(minifyHTML())
		.pipe(gulp.dest(htmlDst));
});

gulp.task('scripts', function() {
	gulp.src(['./src/scripts/lib.js','./src/scripts/*.js'])
		.pipe(concat('script.js'))
		.pipe(stripDebug())
		.pipe(uglify())
		.pipe(gulp.dest('./build/scripts/'));
});

gulp.task('styles', function() {
	gulp.src(['./src/styles/*.css'])
		.pipe(concat('styles.css'))
		.pipe(autoprefix('last 2 versions'))
		.pipe(gulp.dest('./build/styles/'));
});

var input = './src/styles/*.scss';
var output = './build/styles';

gulp.task('sass', function () {
  return gulp
    .src(input)
    .pipe(sass())
    .pipe(minifyCSS())
    .pipe(gulp.dest(output));
});

gulp.task('webserver', function() {
  connect.server();
});