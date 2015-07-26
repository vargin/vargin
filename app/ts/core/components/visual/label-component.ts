/// <reference path="../../../../../typings/tsd.d.ts" />
import { Component, Inject, NgStyle, Optional, View } from 'angular2/angular2';

import { IControlComponent } from 'core/components/control-component';

import BaseControl from 'core/controls/base-control';
import LabelControl from 'core/controls/visual/label-control';
import { ControlService } from 'services/control-service';

@Component({
  selector: 'vargin-label',
  properties: ['control']
})
@View({
  template: `
    <span [ng-style]="control.serializeStyles()">
    {{ control.text.getValue() }}
    </span>
  `,
  directives: [NgStyle]
})
class LabelComponent implements IControlComponent {
  control: LabelControl;

  constructor(@Optional() @Inject(BaseControl) control?: LabelControl) {
    this.control = control || ControlService.create(LabelControl);
  }
}

export default LabelComponent;