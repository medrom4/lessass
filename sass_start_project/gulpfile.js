var
    gulp = require("gulp"),
    livereload = require("gulp-livereload"),
    sass = require("gulp-sass"),
    watch = require("gulp-watch"),
    cleanCSS = require("gulp-clean-css"), // сжимаем css
    autoprefixer = require("gulp-autoprefixer"), // автопрефиксы css
    rename = require("gulp-rename"), // Переименовываем css
    concat = require('gulp-concat'), // Собираем их в кучу в новом файле libs.min.js
    uglify = require('gulp-uglify'), // Сжимаем JS файл ConEmu
    sourcemaps = require('gulp-sourcemaps'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    imageminJpegoptim = require('imagemin-jpegoptim'),
    cache = require('gulp-cache');


//******************************
//********следим за html**********
gulp.task("reload-html", function() {
    return gulp.src("./src/index.html")
        .pipe(livereload());
});
//******************************
//***из sass и css и в папку****
gulp.task("reload-css", function() {
    return gulp.src("./src/css/*.sass")
        .pipe(sourcemaps.init())
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
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("dist/css"))
        .pipe(livereload());
});
//******************************
//********следим за js**********
gulp.task('reload-js', function() {
    return gulp.src([
            'src/libs/jquery/dist/jquery.min.js',
            'src/libs/magnific-popup/dist/jquery.magnific-popup.min.js',
            'src/js/*.js'
        ])
        .pipe(sourcemaps.init())
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/js'))
        .pipe(livereload());
});
//******************************
//*****очищаем кэш**************
gulp.task('clear', function() {
    return cache.clear();
});
//******************************
//*****работаем с картинками****
gulp.task('imgtask', function() {
    gulp.src('./src/img/*.*')
        .pipe(cache(imagemin({
            interlaced: true,
            progressive: true,
            max: 80,
            min: 70,
            svgoPlugins: [{
                removeViewBox: false
            }],
            une: [pngquant({
                quality: '80'
            })],
            use: [imageminJpegoptim()]
        })))
        .pipe(gulp.dest('./dist/img'));
});
//******************************
//******************************
gulp.task("default", function() {
    livereload.listen();
    gulp.watch("./src/css/*.sass", gulp.series("reload-css"));
    gulp.watch("./src/index.html", gulp.series("reload-html"));
    gulp.watch("./src/js/*.js", gulp.series("reload-js"));
});




// var
//     gulp = require("gulp"),
//     livereload = require("gulp-livereload"),
//     sass = require("gulp-sass"),
//     watch = require("gulp-watch"),
//     cleanCSS = require("gulp-clean-css"), // сжимаем css
//     autoprefixer = require("gulp-autoprefixer"), // автопрефиксы css
//     rename = require("gulp-rename"), // Переименовываем css
//     concat = require('gulp-concat'), // Собираем их в кучу в новом файле libs.min.js
//     uglify = require('gulp-uglify'), // Сжимаем JS файл ConEmu
//     sourcemaps = require('gulp-sourcemaps'),
//     imagemin = require('gulp-imagemin'),
//     pngquant = require('imagemin-pngquant'),
//     imageminJpegoptim = require('imagemin-jpegoptim'),
//     cache = require('gulp-cache'),
//     browserSync = require('browser-sync'); // Подключаем Browser Sync;
//
// //*******************************
// //*******************************
// gulp.task('browser-sync', function() { // Создаем таск browser-sync
//     browserSync({ // Выполняем browserSync
//         server: { // Определяем параметры сервера
//             baseDir: 'src' // Директория для сервера - src
//         },
//         notify: false // Отключаем уведомления
//     });
//     browserSync.watch('src/**/*.*').on('change', browserSync.reload);
// });
// //******************************
// //********следим за html**********
// gulp.task("reload-html", function() {
//     return gulp.src("./**/*.html")
// });
// //******************************
// //***из sass и css и в папку****
// gulp.task("reload-css", function() {
//     return gulp.src("src/css/**/*.sass")
//         .pipe(sourcemaps.init())
//         .pipe(sass().on("error", sass.logError))
//         .pipe(autoprefixer({
//             browsers: ["last 3 versions"],
//             cascade: false
//         }))
//         .pipe(cleanCSS({
//             compatibility: "ie8"
//         }))
//         .pipe(rename({
//             suffix: ".min"
//         }))
//         .pipe(sourcemaps.write())
//         .pipe(gulp.dest("src/css-min"))
//         .pipe(browserSync.reload({
//             stream: true
//         }))
// });
// //******************************
// //********следим за js**********
// gulp.task('reload-js', function() {
//     return gulp.src([
//             'src/libs/jquery/dist/jquery.min.js',
//             'src/libs/magnific-popup/dist/jquery.magnific-popup.min.js',
//             'src/js/*.js'
//         ])
//         .pipe(sourcemaps.init())
//         .pipe(concat('libs.min.js'))
//         .pipe(uglify())
//         .pipe(sourcemaps.write())
//         .pipe(gulp.dest('dist/js'))
// });
// //******************************
// //*****очищаем кэш**************
// gulp.task('clear', function() {
//     return cache.clear();
// });
// //******************************
// //*****работаем с картинками****
// gulp.task('imgtask', function() {
//     gulp.src('./src/img/*.*')
//         .pipe(cache(imagemin({
//             interlaced: true,
//             progressive: true,
//             max: 80,
//             min: 70,
//             svgoPlugins: [{
//                 removeViewBox: false
//             }],
//             une: [pngquant({
//                 quality: '80'
//             })],
//             use: [imageminJpegoptim()]
//         })))
//         .pipe(gulp.dest('./dist/img'));
// });
// //******************************
// //******************************
// gulp.task("default", gulp.parallel('browser-sync', 'reload-css', 'reload-js', function() {
//     gulp.watch("src/css/*.sass", gulp.series("reload-css"));
//     gulp.watch("src/*.html", browserSync.reload);
//     gulp.watch("src/js/*.js", browserSync.reload);
// }));
