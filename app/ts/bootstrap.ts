/// <reference path="../../typings/custom.system.d.ts" />
System.config({
  paths: {
    'angular2/angular2': 'lib/angular2.js'
  },
  defaultJSExtensions: true
});

System.import('vargin.js').catch((e) => console.error(e));
