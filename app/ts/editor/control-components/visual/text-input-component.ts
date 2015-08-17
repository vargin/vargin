/// <reference path="../../../../../typings/tsd.d.ts" />
import { Component, Inject, NgStyle, Optional, View } from 'angular2/angular2';

import { Control } from 'core/controls/control';
import { TextInputControl} from 'core/controls/visual/text-input-control';

import { ControlService } from 'services/control-service';

@Component({
  selector: 'vargin-text-input',
  properties: ['control'],
  host: {
    '(^click)': 'onClick($event)'
  }
})
@View({
  template: `
    <input
      type="text"
      [ng-style]="control.serializeStyles()"
      [placeholder]="control.placeholder.getValue()"
      [value]="control.value.getValue()"
    />
  `,
  directives: [NgStyle]
})
class TextInputComponent {
  control: TextInputControl;

  constructor(@Optional() @Inject(Control) control?: TextInputControl) {
    this.control = control || ControlService.create(TextInputControl);
  }

  onClick(e) {
    e.stopPropagation();
    e.preventDefault();

    ControlService.selectControl(this.control);
  }
}

export default TextInputComponent;