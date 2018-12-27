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
	cache = require('gulp-cache'), //кэш памяти
	pngquant = require('imagemin-pngquant'),
	responsive = require('gulp-responsive'), // jpg под изображение екрана
	autoprefixer = require('gulp-autoprefixer'), // префиксы css
	server = require('gulp-server-livereload'), // подключаем сервер
	watch = require('gulp-watch'), // слежение за изменением файлов
	cssnano = require('gulp-cssnano'),
	del = require('del'); // удаление
////////////////////////////////////////
////////////////////////////////////////
// работа сjs
gulp.task('scriptsjs', function () { // конкатинируем все js в один
	return gulp.src('app/js/*.js')
		.pipe(concat('all.min.js'))
		.pipe(uglyfly())
		.pipe(gulp.dest('app/assets/js'));
});
//////////////////////////////////////////
////  картинки под экран
//gulp.task('default', function () {
//    return gulp.src('src/*.{png,jpg}')
//        .pipe(responsive({
//            'background-*.jpg': {
//                width: 700,
//                quality: 50
//            },
//            'cover.png': {
//                width: '50%',
//                // convert to jpeg format
//                format: 'jpeg',
//                rename: 'cover.jpg'
//            },
//            // produce multiple images from one source
//            'logo.png': [
//                {
//                    width: 200
//        }, {
//                    width: 200 * 2,
//                    rename: 'logo@2x.png'
//        }
//      ]
//        }))
//        .pipe(gulp.dest('dist'));
//});
///////////////////////////////////////////////////
// префиксы css
gulp.task('prefix', function () {
    gulp.src('app/css/main.css')
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(gulp.dest('app/css/prefix'))
});
///////////////////////////////////////////////////
// подключаем сервер онлайн
gulp.task('server', function () {
	gulp.src('app/')
		.pipe(server({
			livereload: true,
			defaultFile: 'index.html',
			directoryListing: false,
			open: false
		}));
});
////////////////////////////////////////
gulp.task('sass', function () { // Создаем таск Sass
	return gulp.src('app/sass/**/*.sass') // Берем источник
		.pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
		.pipe(gulp.dest('app/css')) // Выгружаем результата в папку app/css
		.pipe(browserSync.reload({
			stream: true
		})) // Обновляем CSS на странице при изменении
});
//////////////////////////////////////////
gulp.task('browser-sync', function () { // Создаем таск browser-sync
	browserSync({ // Выполняем browserSync
		server: { // Определяем параметры сервера
			baseDir: 'app' // Директория для сервера - app
		},
		notify: false // Отключаем уведомления
	});
	browserSync.watch('app/**/*.*').on('change', browserSync.reload);
});
///////////////////////////////////////////////
//
gulp.task('scripts', function () {
	return gulp.src([ // Берем все необходимые библиотеки
		'app/libs/jquery/dist/jquery.min.js', // Берем jQuery
		'app/libs/magnific-popup/dist/jquery.magnific-popup.min.js' // Берем Magnific Popup
	])
		.pipe(concat('libs.min.js')) // Собираем их в кучу в новом файле libs.min.js
		.pipe(uglify()) // Сжимаем JS файл
		.pipe(gulp.dest('app/js')); // Выгружаем в папку app/js
});
/////////////////////////////////////////////////////
//сжимаем и переименовываем
gulp.task('css-libs', function () {
	return gulp.src('app/css/main.css')
		.pipe(concatCss("assets/bundle.css"))
		.pipe(cleanCSS({
			compatibility: 'ie8'
		}))
		.pipe(cssnano())
		.pipe(uncss({
			html: ['app/index.html']
		}))
		.pipe(rename("bundle.min.css"))
		.pipe(gulp.dest('app/css'));
});
/////////////////////////////////////////////////////
//очищаем и удаляем папку продакшена
gulp.task('clean', function () {
	return del.sync('dist');
});
/////////////////////////////////////////////////////
//очищает кэш
gulp.task('clear', function () {
	return cache.clear();
});
////////////////////////////////////////
//работа с картинками
gulp.task('imgtask', function () {
	gulp.src('app/img/*')
		.pipe(cache(imagemin({
			interlaced: true,
			progressive: true,
			svgoPlugins: [{
				removeViewBox: false
			}],
			une: [pngquant()]
		})))
	.pipe(gulp.dest('dist/img'));
});
//
//
gulp.task('watch', gulp.parallel('browser-sync', 'sass', 'scripts', 'css-libs', function () {
	gulp.watch('app/sass/**/*.sass', gulp.series('sass')); // Наблюдение за sass файлами в папке sass
	gulp.watch('app/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
	gulp.watch('app/js/**/*.js', browserSync.reload); // Наблюдение за JS файлами в папке js
}));

gulp.task('default', gulp.parallel('watch', 'browser-sync'));

/////////////////////////////////////////////////////
//для продакшена
gulp.task('build', gulp.parallel('clean', 'imgtask', 'sass', 'scripts', function () {

	var builCss = gulp.src([
		'app/css/main.css',
		'app/css/bundle.min.css'
	])
		.pipe(gulp.dest('dist/css'));


	var buildFonts = gulp.src('app/fonts/**/*')
		.pipe(gulp.dest('dist/fonts'));

	var buildJs = gulp.src('app/js/**/*')
		.pipe(gulp.dest('dist/js'));

	var buildHtml = gulp.src('app/*.html')
		.pipe(gulp.dest('dist'));
}));
//
//




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
