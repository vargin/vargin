/// <reference path="../../../../../typings/tsd.d.ts" />
import { Component, Inject, NgStyle, Optional, View } from 'angular2/angular2';

import { IControlComponent } from 'core/components/control-component';

import { Control } from 'core/controls/control';
import { RangeControl } from 'core/controls/visual/range-control';

import { ControlService } from 'services/control-service';

@Component({
  selector: 'vargin-range',
  properties: ['control'],
  host: {
    '(^click)': 'onClick($event)'
  }
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

  constructor(@Optional() @Inject(Control) control?: RangeControl) {
    this.control = control || ControlService.create(RangeControl);
  }

  onClick(e) {
    e.stopPropagation();
    e.preventDefault();

    ControlService.selectControl(this.control);
  }
}

export default RangeComponent;