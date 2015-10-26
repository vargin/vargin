'use strict';

var gulp = require('gulp');
var del = require('del');
var Builder = require('systemjs-builder');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var runSequence = require('run-sequence');
var sass = require('gulp-sass');

var EDITOR_PATH = {
  dest: {
    base: 'dist/editor',

    dev: {
      base: 'dist/dev/editor',
      ng2Compiler: 'dist/dev/editor/ng2-compiler'
    }
  },

  src: {
    base: 'src/editor',
    ng2Compiler: 'src/compilers/dom/dom-angular',
    // Order is quite important here for the HTML tag injection.
    lib: [
      './node_modules/angular2/bundles/angular2.dev.js',
      './node_modules/angular2/bundles/router.dev.js',
      './node_modules/systemjs/dist/system-csp-production.js',
      './node_modules/systemjs/dist/system-csp-production.js.map',
      './node_modules/systemjs/dist/system-csp-production.src.js'
    ]
  }
};

gulp.task('clean.dev.editor', function () {
  var environment = 'dev';

  return del(EDITOR_PATH.dest[environment].base);
});

gulp.task('build.dev.editor-lib', function () {
  var environment = 'dev';
  return gulp.src(EDITOR_PATH.src.lib).pipe(
    gulp.dest(EDITOR_PATH.dest[environment].base + '/js/lib')
  );
});

gulp.task('build.dev.editor-fonts', function () {
  var environment = 'dev';

  return gulp.src(EDITOR_PATH.src.base + '/style/fonts/**').pipe(
    gulp.dest(EDITOR_PATH.dest[environment].base + '/style/fonts/')
  );
});

gulp.task('build.dev.editor-styles', function () {
  var environment = 'dev';

  return gulp.src(EDITOR_PATH.src.base + '/style/**/*.scss').pipe(
    sass().on('error', sass.logError)
  ).pipe(
    gulp.dest(EDITOR_PATH.dest[environment].base + '/style/')
  );
});

gulp.task('build.dev.editor-html', function() {
  var environment = 'dev';

  gulp.src(EDITOR_PATH.src.base + '/**/*.html').pipe(
    gulp.dest(EDITOR_PATH.dest[environment].base)
  );

  return gulp.src(EDITOR_PATH.src.base + '/index.html').pipe(
    gulp.dest(EDITOR_PATH.dest[environment].base)
  );
});

gulp.task('build.dev.editor-app', [
  'build.dev.editor-styles', 'build.dev.editor-fonts', 'build.dev.editor-html'
], function() {
  var environment = 'dev';

  var appBuilder = new Builder({
    transpiler: 'typescript',

    typescriptOptions: {
      'noImplicitAny': true,
      'removeComments': true
    },

    paths: {
      'editor/*': 'src/editor/ts/*.ts',
      'core/*': 'src/core/*.ts',
      'compilers/*': 'src/compilers/*.ts',
      'typescript': 'node_modules/typescript/lib/typescript.js'
    },

    meta: {
      'angular2/*': {
        build: false
      }
    }
  });

  return appBuilder.bundle(
    EDITOR_PATH.src.base + '/ts/vargin-editor.ts',
    EDITOR_PATH.dest[environment].base + '/js/vargin-editor.js',
    { minify: false }
  );
});

gulp.task('build.dev.angular-compiler-html', function() {
  var environment = 'dev';

  return gulp.src(EDITOR_PATH.src.ng2Compiler + '/template/*.html').pipe(
    gulp.dest(EDITOR_PATH.dest[environment].ng2Compiler)
  );
});

gulp.task('build.dev.angular-compiler-lib', function() {
  var environment = 'dev';
  return gulp.src(EDITOR_PATH.src.lib).pipe(
    gulp.dest(EDITOR_PATH.dest[environment].ng2Compiler + '/js/lib')
  );
});

gulp.task('build.dev.angular-compiler-app', function() {
  var environment = 'dev';

  var angularCompilerAppBuilder = new Builder({
    transpiler: 'typescript',

    paths: {
      'editor/*': 'src/editor/ts/*.ts',
      'core/*': 'src/core/*.ts',
      'compilers/*': 'src/compilers/*.ts',
      'typescript': 'node_modules/typescript/lib/typescript.js'
    },

    meta: {
      'angular2/*': {
        build: false
      },
      'app-description': {
        build: false
      }
    }
  });

  return angularCompilerAppBuilder.bundle(
    EDITOR_PATH.src.ng2Compiler + '/template/app-controller.ts',
    EDITOR_PATH.dest[environment].ng2Compiler + '/js/app-controller.js',
    {}
  );
});

gulp.task('build.dev.editor', function(done) {
  runSequence(
    'clean.dev.editor',
    'build.dev.editor-lib',
    'build.dev.editor-app',
    'build.dev.angular-compiler-html',
    'build.dev.angular-compiler-lib',
    'build.dev.angular-compiler-app',
    done
  );
});

gulp.task('default', ['build.dev.editor'], function () {
  gulp.watch('./src/**', ['build.dev.editor']);
});
