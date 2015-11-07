/// <reference path="../../../../../typings/tsd.d.ts" />
import {
  Component,
  Inject,
  NgStyle,
  Optional,
  Renderer,
  View,
  ViewContainerRef
} from 'angular2/angular2';

import { Control } from 'core/controls/control';
import { ButtonControl } from 'core/controls/visual/button-control';
import { BaseComponent } from 'editor/ts/control-components/base-component';

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
      [ng-style]="getControlStyles()">
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
