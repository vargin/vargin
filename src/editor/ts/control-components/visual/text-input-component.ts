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
import { TextInputControl} from 'core/controls/visual/text-input-control';

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
export class TextInputComponent extends BaseComponent {
  constructor(
    @Inject(Renderer) renderer: Renderer,
    @Inject(ViewContainerRef) viewContainer: ViewContainerRef,
    @Optional() @Inject(Control) control?: TextInputControl
  ) {
    super(renderer, viewContainer, control);
  }
}
