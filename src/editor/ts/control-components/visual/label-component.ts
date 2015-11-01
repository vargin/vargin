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
import { LabelControl } from 'core/controls/visual/label-control';
import { StringFormatter } from 'core/tools/string-formatter';

import { BaseComponent } from 'editor/ts/control-components/base-component';

@Component({
  selector: 'vargin-label',
  properties: ['control'],
  host: {
    '(click)': 'onClick($event)'
  }
})
@View({
  template: `
    <span [ng-style]="getControlStyles()">{{ getFormattedValue() }}</span>
  `,
  directives: [NgStyle]
})
export class LabelComponent extends BaseComponent {
  control: LabelControl;

  constructor(
    @Inject(Renderer) renderer: Renderer,
    @Inject(ViewContainerRef) viewContainer: ViewContainerRef,
    @Optional() @Inject(Control) control?: LabelControl
  ) {
    super(renderer, viewContainer, control);
  }

  getFormattedValue() {
    let value = this.control.text.getValue();

    if (value.startsWith('bind:')) {
      return value;
    }

    try {
      return StringFormatter.format(
        this.control.text.getValue(),
        +this.control.format.getValue()
      );
    } catch (e) {
      return '[Format Error]';
    }
  }
}
