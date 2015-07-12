/// <reference path="../../../../../typings/tsd.d.ts" />
import { Component, Inject, Optional, View } from 'angular2/angular2';

import BaseControl from 'core/controls/base-control';
import ButtonControl from 'core/controls/visual/button-control';

@Component({
  selector: 'vargin-button',
  properties: ['control']
})

@View({
  template: `
    <button title="{{ control.properties.title.value }}">
      {{ control.properties.text.value }}
    </button>
   `
})

class ButtonComponent {
  private control: ButtonControl;

  constructor(@Optional() @Inject(BaseControl) control?: ButtonControl) {
    this.control = control || new ButtonControl();
  }
}

export default ButtonComponent;