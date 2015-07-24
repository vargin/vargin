/// <reference path="../../../../../typings/tsd.d.ts" />
import { Component, Inject, NgStyle, Optional, View } from 'angular2/angular2';

import { IControlComponent } from 'core/components/control-component';

import BaseControl from 'core/controls/base-control';
import RangeControl from 'core/controls/visual/range-control';

import { ControlService } from 'services/control-service';

@Component({
  selector: 'vargin-range',
  properties: ['control']
})

@View({
  template: `
    <input
      type="range"
      [ng-style]="control.serializeStyles()"
      [min]="control.min.getValue()"
      [max]="control.max.getValue()"
      [step]="control.step.getValue()"
      [value]="control.value.getValue()"
    />
  `,
  directives: [NgStyle]
})

class RangeComponent implements IControlComponent {
  control: RangeControl;

  constructor(@Optional() @Inject(BaseControl) control?: RangeControl) {
    this.control = control || ControlService.create<RangeControl>('range');
  }
}

export default RangeComponent;