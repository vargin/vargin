/// <reference path="../../../../../typings/tsd.d.ts" />
import { Component, Inject, NgStyle, Optional, View } from 'angular2/angular2';

import { IControlComponent } from 'core/components/control-component';

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
      [ng-style]="control.getStyleObject()"
      [min]="control.properties.min.getValue()"
      [max]="control.properties.max.getValue()"
      [step]="control.properties.step.getValue()"
      [value]="control.properties.value.getValue()"
    />
  `,
  directives: [NgStyle]
})

class RangeComponent implements IControlComponent {
  control: RangeControl;

  constructor(@Optional() @Inject(BaseControl) control?: RangeControl) {
    this.control = control || new RangeControl();
  }
}

export default RangeComponent;