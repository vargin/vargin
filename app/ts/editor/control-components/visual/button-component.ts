/// <reference path="../../../../../typings/tsd.d.ts" />
import { Component, Inject, NgStyle, Optional, View } from 'angular2/angular2';

import { Control } from 'core/controls/control';
import { ButtonControl } from 'core/controls/visual/button-control';
import { ControlService } from 'services/control-service';

@Component({
  selector: 'vargin-button',
  properties: ['control'],
  host: {
    '(^click)': 'onClick($event)'
  }
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
class ButtonComponent {
  control: ButtonControl;

  constructor(@Optional() @Inject(Control) control?: ButtonControl) {
    this.control = control || ControlService.create(ButtonControl);
  }

  onClick(e) {
    e.stopPropagation();
     e.preventDefault();

     ControlService.selectControl(this.control);
  }
}

export default ButtonComponent;