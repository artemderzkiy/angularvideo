var gulp       = require('gulp'), 
    sass         = require('gulp-sass'), 
    bs  = require('browser-sync'), 
    concat       = require('gulp-concat'), 
    uglify       = require('gulp-uglifyjs'), 
    cssnano      = require('gulp-cssnano'),
    rename       = require('gulp-rename'), 
    del          = require('del'),
    imagemin     = require('gulp-imagemin'), 
    pngquant     = require('imagemin-pngquant'),
    cache        = require('gulp-cache'),
    autoprefixer = require('gulp-autoprefixer'),
    scss         = require('gulp-scss');


gulp.task('default', ['connect', 'watch']);

gulp.task('watch', function() {
  gulp.watch('./*.html').on('change', bs.reload);
  gulp.watch('./*.css').on('change', bs.reload);
  gulp.watch('./*.js').on('change', bs.reload);
});

gulp.task('connect', function() {
  bs.init({
    server: './',
      port: 8000
  });
});