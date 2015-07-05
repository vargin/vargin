/// <reference path="../../typings/tsd.d.ts" />
import {
  Component,
  View,
  ChangeDetection,
  DynamicChangeDetection,
  bootstrap,
  bind
} from 'angular2/angular2';

import BaseComponent from 'core/components/base';

@Component({
  selector: 'vargin'
})

@View({
  template: '<h1>Hello {{ name }}</h1>'
})

class Vargin {
  name: string;

  constructor() {
    this.name = 'Alice and Bob';
  }
}

bootstrap(Vargin, [bind(ChangeDetection).toClass(DynamicChangeDetection)]);