var   gulp = require('gulp')
		,	jshint = require('gulp-jshint')
		,	jshintReporter = require('jshint-stylish')
    , less = require('gulp-less')
    , csso = require('gulp-csso') // Минификация CSS
    , concat = require('gulp-concat') // Склейка файлов
    , uglify = require('gulp-uglify') // Минификация JS
    , rename = require('gulp-rename')
		, watch = require('gulp-watch');

/*
 * Create variables for our project paths so we can change in one place
 */
var paths = {
	'src':['./models/**/*.js','./routes/**/*.js', 'keystone.js', 'package.json'],
	'publicjs' : [ './public/js/app/**/*.js', ],
	'publicless': ['./public/styles/style.less']
};

// Собираем JS
gulp.task('js', function() {
    gulp.src(paths.publicjs)
        .pipe(concat('script.min.js'))
        // .pipe(uglify())
        .pipe(gulp.dest('./public/js'))
    ;
});

// Less
gulp.task('less-build', function() {
    gulp.src(paths.publicless)
        .pipe(less()) // процессим less
        .pipe(csso())
        .pipe(rename(function(path) { path.basename = "site.min"; }))
        .pipe(gulp.dest('./public/styles')) // записываем css
    ;
});

// Запуск сервера разработки gulp watch
gulp.task('watch', function() {
    console.log("gulp is watching");

    // Предварительная сборка проекта
    gulp.run('less-build');
    gulp.run('js');

    gulp.watch('./public/styles/**/*.less', function() {
        gulp.run('less-build');
    });
    gulp.watch('./public/js/**/*', function() {
        gulp.run('js');
    });
});


// gulp lint
gulp.task('lint', function(){
	gulp.src(paths.src)
		.pipe(jshint())
		.pipe(jshint.reporter(jshintReporter));

});

// gulp watcher for lint
gulp.task('watch:lint', function () {
	gulp.src(paths.src)
		.pipe(watch())
		.pipe(jshint())
		.pipe(jshint.reporter(jshintReporter));
});
