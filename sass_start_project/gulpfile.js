var
	gulp = require("gulp"),
	livereload = require("gulp-livereload"),
	sass = require("gulp-sass"),
	watch = require("gulp-watch"),
	cleanCSS = require("gulp-clean-css"), // сжимаем css
	autoprefixer = require("gulp-autoprefixer"), // автопрефиксы css
	rename = require("gulp-rename"),// Переименовываем css
	concat = require('gulp-concat'), // Собираем их в кучу в новом файле libs.min.js
	uglify = require('gulp-uglify'); // Сжимаем JS файл ConEmu

//******************************
//********следим за html**********
gulp.task("reload-html", function () {
	return gulp.src("./**/*.html")
		.pipe(livereload());
});
//******************************
//***из sass и css и в папку****
gulp.task("reload-css", function () {
	return gulp.src("./src/css/*.sass")
		.pipe(sass().on("error", sass.logError))
		.pipe(autoprefixer({
			browsers: ["last 3 versions"],
			cascade: false
		}))
		.pipe(gulp.dest("dist/css"))
		.pipe(cleanCSS({
			compatibility: "ie8"
		}))
		.pipe(rename({
			suffix: ".min"
		}))
		.pipe(gulp.dest("dist/css"))
		.pipe(livereload());
});
//******************************
//********следим за js**********
gulp.task('reload-js', function () {
	return gulp.src([
		'src/libs/jquery/dist/jquery.min.js',
		'src/libs/magnific-popup/dist/jquery.magnific-popup.min.js',
		'src/js/*.js'
	])
		.pipe(concat('libs.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'))
		.pipe(livereload());
});
//******************************
//******************************
gulp.task("default", function () {
	livereload.listen();
	gulp.watch("./src/css/*.sass", gulp.series("reload-css"));
	gulp.watch("./**/*.html", gulp.series("reload-html"));
	gulp.watch("./src/js/*.js", gulp.series("reload-js"));
});
