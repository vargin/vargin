/// <reference path="../../../../../typings/tsd.d.ts" />
import { Component, View } from 'angular2/angular2';

import BaseComponent from 'core/components/base';

@Component({
  selector: 'vargin-button',
  properties: ['text', 'title']
})

@View({
  template: `
    <button title="{{ title }}" (click)="onClick()">
      {{ text }}
    </button>
   `
})

class ButtonComponent extends BaseComponent {
  private text: string;
  private title: string;

  constructor() {
    super('button', 'Button', 'HTML Button', 'visual');

    this.text = 'Button';
  }

  onClick() {
    alert(this.text);
  }
}

export default ButtonComponent;