var gulp = require('gulp');
var modRewrite = require('connect-modrewrite');
var browserSync = require('browser-sync');

// Static server
gulp.task('serve', function () {
    browserSync({
        server: {
            baseDir: "./",
            middleware: [
                modRewrite([
                    '!\\.\\w+$ /index.html [L]'
                ])
            ]
        }
    });
});