var
	gulp = require("gulp"),
	livereload = require("gulp-livereload"),
	sass = require("gulp-sass"),
	watch = require("gulp-watch"),
	cleanCSS = require("gulp-clean-css"),
	autoprefixer = require("gulp-autoprefixer"),
	rename = require("gulp-rename");

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
//******************************
gulp.task("default", function () {
	livereload.listen();
	gulp.watch("./src/css/*.sass", gulp.series("reload-css"));
	gulp.watch("./**/*.html", gulp.series("reload-html"));
});
