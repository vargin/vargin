'use strict';

var gulp = require('gulp');
var del = require('del');
var Builder = require('systemjs-builder');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var runSequence = require('run-sequence');
var sass = require('gulp-sass');

var PATH = {
  dest: {
    all: 'dist',
    dev: {
      all: 'dist/dev',
      lib: 'dist/dev/lib',
      ng2: 'dist/dev/lib/angular2.js',
      style: 'dist/dev/style',
      ngCompiler: {
        all: 'dist/dev/ng-compiler',
        lib: 'dist/dev/ng-compiler/lib'
      }
    },
    prod: {
      all: 'dist/prod',
      lib: 'dist/prod/lib'
    }
  },
  src: {
    // Order is quite important here for the HTML tag injection.
    lib: [
      './node_modules/angular2/node_modules/traceur/bin/traceur-runtime.js',

      './node_modules/reflect-metadata/temp/Reflect.js',
      './node_modules/reflect-metadata/temp/Reflect.js.map',

      './node_modules/systemjs/dist/system-csp-production.js',
      './node_modules/systemjs/dist/system-csp-production.js.map',
      './node_modules/systemjs/dist/system-csp-production.src.js',

      './node_modules/zone.js/dist/zone.min.js'
    ]
  }
};

var ng2Builder = new Builder({
  paths: {
    'angular2/*': 'node_modules/angular2/es6/dev/*.js',
    rx: 'node_modules/angular2/node_modules/rx/dist/rx.js'
  },

  meta: {
    rx: {
      format: 'cjs'
    }
  },

  defaultJSExtensions: true
});

gulp.task('clean.dev', function (done) {
  del(PATH.dest.dev.all, done);
});

gulp.task('build.dev.ng2', ['clean.dev'], function () {
  return ng2Builder.build('angular2/angular2', PATH.dest.dev.ng2, {});
});

gulp.task('build.dev.lib', ['build.dev.ng2'], function () {
  return gulp.src(PATH.src.lib).pipe(gulp.dest(PATH.dest.dev.lib));
});

gulp.task('build.dev.styles', function () {
  return gulp.src('./app/style/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(PATH.dest.dev.style));
});

gulp.task('build.dev.index', function() {
  gulp.src('./app/ts/editor/**/*.html').pipe(gulp.dest(PATH.dest.dev.all));

  return gulp.src(['./app/index.html']).pipe(gulp.dest(PATH.dest.dev.all));
});

gulp.task('build.dev.app', ['build.dev.styles', 'build.dev.index'], function() {
  var appBuilder = new Builder({
    transpiler: 'typescript',

    paths: {
      '*': 'app/ts/*.ts',
      'typescript': 'node_modules/typescript/lib/typescript.js'
    },

    meta: {
      'angular2/*': {
        build: false
      }
    },

    // Don't work until the following issues are resolved:
    // https://github.com/systemjs/builder/issues/177
    // https://github.com/Microsoft/TypeScript/issues/3363
    sourceMaps: true
  });

  return appBuilder.build('vargin', PATH.dest.dev.all + '/vargin.js', {});
});

gulp.task('build.dev.angular-compiler.html', function() {
  return gulp.src('./app/ts/compilers/dom/dom-angular/template/*.html').pipe(
    gulp.dest(PATH.dest.dev.ngCompiler.all)
  );
});

gulp.task('build.dev.angular-compiler.libs', function() {
  return gulp.src(PATH.src.lib).pipe(gulp.dest(PATH.dest.dev.ngCompiler.lib));
});

gulp.task('build.dev.angular-compiler.ng2', function () {
  return ng2Builder.build(
    'angular2/angular2', PATH.dest.dev.ngCompiler.lib + '/angular2.js', {}
  );
});

gulp.task('build.dev.angular-compiler.app', function() {
  var angularCompilerAppBuilder = new Builder({
    transpiler: 'typescript',

    paths: {
      '*': 'app/ts/*.ts',
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

  return angularCompilerAppBuilder.build(
    'compilers/dom/dom-angular/template/app-controller',
    PATH.dest.dev.ngCompiler.all + '/app-controller.js',
    {}
  );
});

gulp.task('build.dev.angular-compiler', function(done) {
  runSequence(
    'build.dev.angular-compiler.html',
    'build.dev.angular-compiler.libs',
    'build.dev.angular-compiler.ng2',
    'build.dev.angular-compiler.app',
    done
  );
});

gulp.task('build.dev', function(done) {
  runSequence(
    'clean.dev', 'build.dev.lib', 'build.dev.app', 'build.dev.angular-compiler',
    done
  );
});

gulp.task('default', ['build.dev'], function () {
  gulp.watch('./app/**', ['build.dev.app', 'build.dev.angular-compiler']);
});
