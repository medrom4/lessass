var gulp = require('gulp');
var concat = require('gulp-concat');
var cssFiles = [ // порядок соединения css
	'./src/css/**/common.css',
	'./src/css/**/style.css',
	'./node_modules/normalize.css/normalize.css'
];
var autoprefixer = require('gulp-autoprefixer'); // префиксы css
var cleanCSS = require('gulp-clean-css'); // минифицирует css

var jsFiles = [ // порядок соединения css
	'./src/js/lib.js',
	'./src/js/script.js',
];
var uglify = require('gulp-uglify');
var del = require('del');
var browserSync = require('browser-sync').create();
/////////////////////////////////////////////////////////////////

function styles() {
	return gulp.src(cssFiles)
		.pipe(concat('all.css'))
		.pipe(autoprefixer({
			browsers: ['>0.1%'],
			cascade: false
		}))
		.pipe(cleanCSS({
			level: 2
		}))
		.pipe(gulp.dest('./build/css'))
		.pipe(browserSync.stream());
}

function scripts() {
	return gulp.src(jsFiles)
		.pipe(concat('all.js'))
		.pipe(uglify({
			toplevel: true
		}))
		.pipe(gulp.dest('./build/js'))
		.pipe(browserSync.stream());
}


function watch() {
	browserSync.init({
		server: {
			baseDir: "./"
		}
	})
	gulp.watch('./src/css/**/*.css', styles);
	gulp.watch('./src/js/**/*.js', scripts);
	gulp.watch('./*.html', browserSync.reload);
}

function clean() {
	return del(['build/*']);
}


gulp.task('styles', styles);
gulp.task('scripts', scripts);
gulp.task('watch', watch);

gulp.task('build', gulp.series(clean, gulp.parallel(styles, scripts)));
gulp.task('dev', gulp.series('build', 'watch'));
