'use strict';

// Required modules
const gulp = require('gulp');
const doctoc = require('doctoc/lib/transform');
const del = require('del');
const $ = require('gulp-load-plugins')();
const reactDocsPlugin = require('../');
const { exec } = require('child_process');

// Helper vars
var docsDest = 'docs';

// Tasks
gulp.task('clean', function (cb) { 
    del.sync(docsDest);
    cb();
});

gulp.task('check:docs', function (cb) {
    exec('git diff --name-only docs/', function (err, diffFiles) {
        if (diffFiles.indexOf('.md') > -1) {
            console.log('Automatically generated documentation is not up to \
date with the changes in the codebase. Please run `gulp` and commit the changes.');
            process.exit(1);
        } else {
            console.log('Automatically generated documentation is up to date!');
        }
        cb();
    });
});

gulp.task('react-docs', function () {
    var mdTitle = '# React Component Reference';

    return gulp.src('./components/**/*.jsx')
        .pipe(reactDocsPlugin({
            path: docsDest
        }))
        .pipe($.concat('README.md'))
        .pipe($.tap(function (file) {
            // Generate table of contents for components.md
            var mdWithToc = doctoc(file.contents.toString(), null, 2, mdTitle).data;
            file.contents = Buffer.from(mdWithToc);
        }))
        .pipe(gulp.dest(docsDest));
});

gulp.task('default', gulp.series('react-docs'));
