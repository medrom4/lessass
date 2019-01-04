var
    gulp = require("gulp"),
    livereload = require("gulp-livereload"),
    sass = require('gulp-sass');


gulp.task("reload-css", function () {
    gulp.src("./src/css/*.css")
        .pipe(livereload());
});

gulp.task("default", function () {
    livereload.listen();
    gulp.watch("./src/css/*.css", gulp.series("reload-css"));
});
