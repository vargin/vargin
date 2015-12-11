import {
  Component, Inject, Optional, Renderer, View, ViewContainerRef
} from 'angular2/core';
import { NgStyle } from 'angular2/common';

import { Control } from '../../../../core/controls/control';
import { ButtonControl } from '../../../../core/controls/visual/button-control';
import { BaseComponent } from '../base-component';

@Component({
  selector: 'vargin-button',
  properties: ['control'],
  host: {
    '(click)': 'onClick($event)'
  }
})
@View({
  template: `
    <button
      [title]="getPropertyValue('title')"
      [type]="getPropertyValue('type')"
      [ngStyle]="getControlStyles()">
      {{ getPropertyValue('text') }}
    </button>
  `,
  directives: [NgStyle]
})
export class ButtonComponent extends BaseComponent {
  constructor(
    @Inject(Renderer) renderer: Renderer,
    @Inject(ViewContainerRef) viewContainer: ViewContainerRef,
    @Optional() @Inject(Control) control?: ButtonControl
  ) {
    super(renderer, viewContainer, control);
  }
}
