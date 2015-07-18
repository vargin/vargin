/// <reference path="../../../../../typings/tsd.d.ts" />
import { Component, Inject, NgStyle, Optional, View } from 'angular2/angular2';

import BaseControl from 'core/controls/base-control';
import ButtonControl from 'core/controls/visual/button-control';

@Component({
  selector: 'vargin-button',
  properties: ['control']
})

@View({
  template: `
    <button
      [title]="control.properties.title.getValue()"
      [type]="control.properties.type.getValue()"
      [ng-style]="control.getStyleObject()">
      {{ control.properties.text.getValue() }}
    </button>
  `,
  directives: [NgStyle]
})

class ButtonComponent {
  private control: ButtonControl;

  constructor(@Optional() @Inject(BaseControl) control?: ButtonControl) {
    this.control = control || new ButtonControl();
  }
}

export default ButtonComponent;