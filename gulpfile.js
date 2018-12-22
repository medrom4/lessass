var gulp = require('gulp'), // Подключаем Gulp
	sass = require('gulp-sass'), //Подключаем Sass пакет
	browserSync = require('browser-sync'), // Подключаем Browser Sync
	concat = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
	uglify = require('gulp-uglifyjs') // Подключаем gulp-uglifyjs (для сжатия JS)


	gulp.task('sass', function () { // Создаем таск Sass
		return gulp.src('app/sass/main.sass') // Берем источник
			.pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
			.pipe(gulp.dest('app/css')) // Выгружаем результата в папку app/css
			.pipe(browserSync.reload({
				stream: true
			})) // Обновляем CSS на странице при изменении
	});


gulp.task('scripts', function() {
	return gulp.src([ // Берем все необходимые библиотеки
		'app/libs/jquery/dist/jquery.min.js', // Берем jQuery
		'app/libs/magnific-popup/dist/jquery.magnific-popup.min.js' // Берем Magnific Popup
	])
	.pipe(concat('libs.min.js')) // Собираем их в кучу в новом файле libs.min.js
	.pipe(uglify()) // Сжимаем JS файл
	.pipe(gulp.dest('app/js')); // Выгружаем в папку app/js
});


gulp.task('browser-sync', function () { // Создаем таск browser-sync
	browserSync.init({ // Выполняем browserSync
		server: { // Определяем параметры сервера
			baseDir: 'app' // Директория для сервера - app
		},
		browser: 'chrome',
		notify: false // Отключаем уведомления
	});
});

gulp.task('watch', gulp.series('browser-sync', 'sass', function () {
	gulp.watch('app/sass/**/*.sass', gulp.parallel('sass')); // Наблюдение за sass файлами в папке sass
	gulp.watch('app/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
	gulp.watch('app/js/**/*.js', browserSync.reload); // Наблюдение за JS файлами в папке js
}));

gulp.task('default', gulp.parallel('watch', 'browser-sync'));





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


