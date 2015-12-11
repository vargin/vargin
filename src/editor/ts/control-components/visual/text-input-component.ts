import {
  Component, Inject, Optional, Renderer, View, ViewContainerRef
} from 'angular2/core';
import { NgStyle } from 'angular2/common';

import { Control } from '../../../../core/controls/control';
import { TextInputControl} from '../../../../core/controls/visual/text-input-control';

import { BaseComponent } from '../base-component';

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
      [ngStyle]="getControlStyles()"
      [placeholder]="getPropertyValue('placeholder')"
      [value]="getPropertyValue('value')"
    />
  `,
  directives: [NgStyle]
})
export class TextInputComponent extends BaseComponent {
  constructor(
    @Inject(Renderer) renderer: Renderer,
    @Inject(ViewContainerRef) viewContainer: ViewContainerRef,
    @Optional() @Inject(Control) control?: TextInputControl
  ) {
    super(renderer, viewContainer, control);
  }
}
