var gulp = require('gulp'), // Подключаем Gulp
    sass = require('gulp-sass'), //Подключаем Sass пакет
    browserSync = require('browser-sync'), // Подключаем Browser Sync
    concat = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
    uglify = require('gulp-uglifyjs'), // Подключаем gulp-uglifyjs (для сжатия JS)
    concatCss = require('gulp-concat-css'), // соединяет все сss в один
    cleanCSS = require('gulp-clean-css'), // минифицирует css
    rename = require("gulp-rename"), // переименование итогового файла css
    uncss = require('gulp-uncss'), // удалить неиспользуемые css
    uglyfly = require('gulp-uglyfly'), // минимизация js
    imagemin = require('gulp-imagemin'), // сжатие картинок
    responsive = require('gulp-responsive'); // jpg под изображение екрана


// работа с css
gulp.task('gconcatcss', function () {
    return gulp.src('app/css/**/*.css')
        .pipe(concatCss("assets/bundle.css"))
        .pipe(cleanCSS({
            compatibility: 'ie8'
        }))
        .pipe(uncss({
            html: ['app/index.html']
        }))
        .pipe(rename("bundle.min.css"))
        .pipe(gulp.dest('app/assets/css'));
});

// работа сjs
gulp.task('scriptsjs', function () { // конкатинируем все js в один
    return gulp.src('app/js/*.js')
        .pipe(concat('all.min.js'))
        .pipe(uglyfly())
        .pipe(gulp.dest('app/assets/js'));
});

// сжатие картинок
gulp.task('imgtask', () =>
    gulp.src('app/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('app/assets/img'))
);

//  картинки под экран
gulp.task('default', function () {
    return gulp.src('src/*.{png,jpg}')
        .pipe(responsive({
            'background-*.jpg': {
                width: 700,
                quality: 50
            },
            'cover.png': {
                width: '50%',
                // convert to jpeg format
                format: 'jpeg',
                rename: 'cover.jpg'
            },
            // produce multiple images from one source
            'logo.png': [
                {
                    width: 200
        }, {
                    width: 200 * 2,
                    rename: 'logo@2x.png'
        }
      ]
        }))
        .pipe(gulp.dest('dist'));
});




gulp.task('sass', function () { // Создаем таск Sass
    return gulp.src('app/sass/**/*.sass') // Берем источник
        .pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(gulp.dest('app/css')) // Выгружаем результата в папку app/css
        .pipe(browserSync.reload({
            stream: true
        })) // Обновляем CSS на странице при изменении
});


gulp.task('scripts', function () {
    return gulp.src([ // Берем все необходимые библиотеки
		'app/libs/jquery/dist/jquery.min.js', // Берем jQuery
		'app/libs/magnific-popup/dist/jquery.magnific-popup.min.js' // Берем Magnific Popup
	])
        .pipe(concat('libs.min.js')) // Собираем их в кучу в новом файле libs.min.js
        .pipe(uglify()) // Сжимаем JS файл
        .pipe(gulp.dest('app/js')); // Выгружаем в папку app/js
});


gulp.task('browser-sync', function () { // Создаем таск browser-sync
    browserSync({ // Выполняем browserSync
        server: { // Определяем параметры сервера
            baseDir: 'app' // Директория для сервера - app
        },
        notify: false // Отключаем уведомления
    });
    //	browserSync.watch('app/**/*.*').on('change', browserSync.reload);
});

gulp.task('watch', gulp.parallel('browser-sync', 'sass', function () {
    gulp.watch('app/sass/**/*.sass', ['sass']); // Наблюдение за sass файлами в папке sass
    gulp.watch('app/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
    gulp.watch('app/js/**/*.js', browserSync.reload); // Наблюдение за JS файлами в папке js
}));

// gulp.task('default', gulp.parallel('watch', 'browser-sync'));





/* команды */

//npm i gulp -g /* устанавливаем галп глобально */
//npm init /* старт */
//npm i gulp --save-dev /* установка пакета */

//npm i gulp-sass --save-dev /* установка sass */

//npm i browser-sync --save-dev /* установка browser-synk */
//npm install browser-sync gulp --save-dev

//gulp sass /* выполняем таск */
//gulp watch /* cлежение за изменениями "Ctrl+C два раза - выйти" 47.04 */

//npm i -g bower /* устанавливаем библиатеку (должен быть установлен git) */

//bower i jquery magnific-popup /* устанавливаем jQ и mag-popup */

//npm i gulp-concat gulp-uglifyjs --save-dev /* gulp-concat (для конкатенации файлов) 														gulp-uglifyjs (для сжатия JS) */
