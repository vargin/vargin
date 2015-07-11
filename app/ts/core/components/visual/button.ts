/// <reference path="../../../../../typings/tsd.d.ts" />
import { Component, Inject, Optional, View } from 'angular2/angular2';

import BaseControl from 'core/controls/base';
import ButtonControl from 'core/controls/visual/button';

@Component({
  selector: 'vargin-button',
  properties: ['control']
})

@View({
  template: `
    <button title="{{ control.title }}" (click)="onClick()">
      {{ control.text }}
    </button>
   `
})

class ButtonComponent {
  private control: ButtonControl;

  constructor(@Optional() @Inject(BaseControl) control?: ButtonControl) {
    this.control = control || new ButtonControl();
  }

  onClick() {
    alert(this.control.text);
  }
}

export default ButtonComponent;