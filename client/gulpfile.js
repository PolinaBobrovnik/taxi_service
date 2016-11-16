var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var webserver = require('gulp-webserver');
var plumber = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');

var plumberConfig = {
  handleError: function (err) {
    console.log(err);
    this.emit('end');
  }
};

gulp.task('scripts', function() {
  return gulp.src(['./node_modules/**/angular.min.js',
                   './node_modules/**/angular-ui-router.min.js',
                   'node_modules/**/angular-animate.min.js',
                   './node_modules/**/angular-sanitize.min.js',
                   './node_modules/**/ui-bootstrap-tpls.js',
                   './src/**/ngProgress.min.js',
                   './src/**/app.js', 
                   './src/scripts/app/**/*.js'
    ])
    .pipe(plumber(plumberConfig))
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    // .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public/js'));
});

gulp.task('styles', function() {
  return gulp.src('./src/styles/sass/app.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 2 versions', 'ie 9']
    })) 
    .pipe(gulp.dest('./public/css'));

});

gulp.task('watch', function() {
  gulp.watch('./src/scripts/**/*.js', ['scripts']);
  gulp.watch('./src/styles/**/*.scss', ['styles']);
});

gulp.task('server', function() {
  return gulp.src('./public')
    .pipe(webserver({
      port: 8085,
      livereload: true,
      open: true
    }));
});

gulp.task('start', ['scripts','styles','watch', 'server']);

  
