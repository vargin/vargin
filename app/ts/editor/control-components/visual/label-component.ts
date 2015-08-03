/// <reference path="../../../../../typings/tsd.d.ts" />
import { Component, Inject, NgStyle, Optional, View } from 'angular2/angular2';

import { Control } from 'core/controls/control';
import { LabelControl } from 'core/controls/visual/label-control';
import { ControlService } from 'services/control-service';

@Component({
  selector: 'vargin-label',
  properties: ['control'],
  host: {
    '(^click)': 'onClick($event)'
  }
})
@View({
  template: `
    <span [ng-style]="control.serializeStyles()">
    {{ control.text.getValue() }}
    </span>
  `,
  directives: [NgStyle]
})
class LabelComponent {
  control: LabelControl;

  constructor(@Optional() @Inject(Control) control?: LabelControl) {
    this.control = control || ControlService.create(LabelControl);
  }

  onClick(e) {
    e.stopPropagation();
    e.preventDefault();

    ControlService.selectControl(this.control);
  }
}

export default LabelComponent;