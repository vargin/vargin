/// <reference path="../../../../../typings/tsd.d.ts" />
import { Component, Inject, Optional, View } from 'angular2/angular2';

import BaseControl from 'core/controls/base-control';
import RangeControl from 'core/controls/visual/range-control';

@Component({
  selector: 'vargin-range',
  properties: ['control']
})

@View({
  template: `
    <input
      type="range"
      [min]="control.properties.min.value"
      [max]="control.properties.max.value"
      [step]="control.properties.step.value"
      [value]="control.properties.value.value"
    />
   `
})

class RangeComponent {
  private control: RangeControl;

  constructor(@Optional() @Inject(BaseControl) control?: RangeControl) {
    this.control = control || new RangeControl();
  }
}

export default RangeComponent;