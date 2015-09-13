/// <reference path="../../../../../typings/tsd.d.ts" />
import { Component, Inject, NgStyle, Optional, View } from 'angular2/angular2';

import { Control } from 'core/controls/control';
import { TextInputControl} from 'core/controls/visual/text-input-control';

import { ControlService } from 'services/control-service';

import { BaseComponent } from 'editor/control-components/base-component';

@Component({
  selector: 'vargin-text-input',
  properties: ['control'],
  host: {
    '(click)': 'onClick($event)'
  }
})
@View({
  template: `
    <input
      type="text"
      [ng-style]="getControlStyles()"
      [placeholder]="control.placeholder.getValue()"
      [value]="control.value.getValue()"
    />
  `,
  directives: [NgStyle]
})
class TextInputComponent extends BaseComponent {
  control: TextInputControl;

  constructor(@Optional() @Inject(Control) control?: TextInputControl) {
    super(control || ControlService.create(TextInputControl));
  }
}

export default TextInputComponent;
