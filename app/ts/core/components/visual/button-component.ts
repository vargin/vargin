/// <reference path="../../../../../typings/tsd.d.ts" />
import { Component, Inject, NgStyle, Optional, View } from 'angular2/angular2';

import { IControlComponent } from 'core/components/control-component';
import BaseControl from 'core/controls/base-control';
import ButtonControl from 'core/controls/visual/button-control';
import { ControlService } from 'services/control-service';

@Component({
  selector: 'vargin-button',
  properties: ['control']
})
@View({
  template: `
    <button
      [title]="control.title.getValue()"
      [type]="control.type.getValue()"
      [ng-style]="control.serializeStyles()">
      {{ control.text.getValue() }}
    </button>
  `,
  directives: [NgStyle]
})
class ButtonComponent implements IControlComponent {
  control: ButtonControl;

  constructor(@Optional() @Inject(BaseControl) control?: ButtonControl) {
    this.control = control || ControlService.create(ButtonControl);
  }
}

export default ButtonComponent;