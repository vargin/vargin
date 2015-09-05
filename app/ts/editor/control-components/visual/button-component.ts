/// <reference path="../../../../../typings/tsd.d.ts" />
import {
  Component,
  Inject,
  NgStyle,
  Optional,
  View
} from 'angular2/angular2';

import { Control } from 'core/controls/control';
import { ButtonControl } from 'core/controls/visual/button-control';
import { ControlService } from 'services/control-service';
import { BaseComponent } from 'editor/control-components/base-component';

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
      [ng-style]="getControlStyles()">
      {{ control.text.getValue() }}
    </button>
  `,
  directives: [NgStyle]
})
class ButtonComponent extends BaseComponent {
  control: ButtonControl;

  constructor(@Optional() @Inject(Control) control?: ButtonControl) {
    super(control || ControlService.create(ButtonControl));
  }
}

export default ButtonComponent;
