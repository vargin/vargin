/// <reference path="../../../../../typings/tsd.d.ts" />
import { Component, Inject, Optional, View } from 'angular2/angular2';

import BaseControl from 'core/controls/base-control';
import { LabelControl } from 'core/controls/visual/label-control';

@Component({
  selector: 'vargin-label',
  properties: ['control']
})

@View({
  template: `<span>{{ control.properties.text.value }}</span>`
})

class LabelComponent{
  private control: LabelControl;

  constructor(@Optional() @Inject(BaseControl) control?: LabelControl) {
    this.control = control || new LabelControl();
  }
}

export default LabelComponent;