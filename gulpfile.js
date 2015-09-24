
// ===============================================================================
// Setup gulp, plugins and global variables
// ===============================================================================

var gulp = require('gulp');
var scss = require('gulp-sass');
var webserver = require('gulp-webserver');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var react = require('gulp-react');
var minifyCSS = require('gulp-minify-css');
var autoprefix = require('gulp-autoprefixer');
var clean = require('del');
var htmlhint = require('gulp-htmlhint');
var htmlmin = require('gulp-htmlmin');

// end: setup gulp, plugins and variables
// ===============================================================================

// ========================================
// Location of app directories and files
// ========================================

// directories
var appDirectory = {
  src: 'src',
  dist: 'dist',
  npmDir: 'node_modules'
};

// files
var appFiles = {
  jsx: appDirectory.src + '/js/*.jsx',
  assets: [appDirectory.src + '/images/*', appDirectory.src + '/data/*'],
  scss: appDirectory.src + '/scss/*.scss',
  html: appDirectory.src + '/*.html',
  fonts: appDirectory.npmDir + '/font-awesome/fonts/*',
  vendorJS: [appDirectory.npmDir + '/jquery/dist/jquery.js', appDirectory.npmDir + '/react/dist/react.js']
};

// end: location of directories and files
// ===============================================================================

// ===============================================================================
// Build the app into the dist directory
// ===============================================================================

gulp.task('build-dist', ['vendor', 'scss', 'scripts', 'html', 'assets']);

// copy across vendor files
gulp.task('vendor', function() {

  // get fonts
  gulp.src(appFiles.fonts)
  .pipe(gulp.dest(appDirectory.dist + '/fonts'));

  // get all JS
  gulp.src(appFiles.vendorJS)
  //.pipe(uglify())
  .pipe(concat('vendor.min.js'))
  .pipe(gulp.dest(appDirectory.dist + '/js'));

});

// process our Sass
gulp.task('scss', function() {
  return gulp.src(appFiles.scss)
  .pipe(scss({
    includePaths: [appDirectory.npmDir + '/foundation-sites/scss']
  }))
  .pipe(scss({
    errLogToConsole: true
  }))
  .pipe(autoprefix())
  //.pipe(minifyCSS())
  .pipe(concat('pd.min.css'))
  .pipe(gulp.dest(appDirectory.dist + '/css'));
});

// quality check our JS, minify and copy to dist
gulp.task('scripts', function() {
  return gulp.src(appFiles.jsx)
  //  .pipe(jshint())
  //  .pipe(jshint.reporter('default'))
  //  .pipe(uglify())
  .pipe(react())
  .on('error', function(err) {
    console.error('JSX ERROR in ' + err.fileName);
    console.error(err.message);
    this.end();
  })
  .pipe(concat('pd.min.js'))
  .pipe(gulp.dest(appDirectory.dist + '/js'));
});

// copy across our html files
gulp.task('html', function() {

  // check our HTML, minify it and copy all the html files to our dist directory
  return gulp.src(appFiles.html)
  .pipe(htmlhint())
  .pipe(htmlhint.reporter())
  .pipe(htmlmin({
    collapseWhitespace: true,
    removeComments: true
  }))
  .pipe(gulp.dest(appDirectory.dist));
});

// copy across our assets
gulp.task('assets', function() {

  return gulp.src(appFiles.assets, {base:'src'})
  .pipe(gulp.dest(appDirectory.dist + '/assets'));
});

// end: build app into dist directory
// ===============================================================================

// ===============================================================================
// Setup webserver, watch task, clean task and default gulp task
// ===============================================================================

// setup our webserver
gulp.task('webserver', ['build-dist'], function() {
  gulp.src(appDirectory.dist)
  .pipe(webserver({
    livereload: true,
    open: true
  }));
});

gulp.task('clean', function(cb) {
  clean([appDirectory.dist]);
});

// watch our files for changes
gulp.task('watch', function() {
  gulp.watch(appFiles.scss, ['scss']);
  gulp.watch(appFiles.jsx, ['scripts']);
  gulp.watch(appFiles.html, ['html']);
  gulp.watch(appFiles.assets, ['assets']);
});

// run our tasks on running 'gulp' from the command line
gulp.task('default', ['build-dist', 'watch', 'webserver']);

// end: setup webserver, watch task and default gulp task
// ===============================================================================
