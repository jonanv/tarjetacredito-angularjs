// npm install gulp --save-dev
// npm install gulp-cli --save-dev
// npm install gulp-imagemin --save-dev
// npm install imagemin-mozjpeg --save-dev
// npm install imagemin-pngquant --save-dev

// npx gulp imagemin
// npm run gulp:imagemin

const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const mozjpeg = require('imagemin-mozjpeg');

gulp.task('imagemin', () => {
    return gulp.src(['img/*', 'img/bg-tarjeta/*', 'img/logos/*'])
        .pipe(imagemin([
            pngquant({ quality: [0.5, 0.5] }),
            mozjpeg({ quality: 50 })
        ]))
        .pipe(gulp.dest(['src/assets/img/']))
});
