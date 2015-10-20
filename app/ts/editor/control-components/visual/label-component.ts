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

import { BaseComponent } from 'editor/control-components/base-component';

@Component({
  selector: 'vargin-label',
  properties: ['control'],
  host: {
    '(click)': 'onClick($event)'
  }
})
@View({
  template: `
    <span [ng-style]="getControlStyles()">
    {{ control.text.getValue() }}
    </span>
  `,
  directives: [NgStyle]
})
export class LabelComponent extends BaseComponent {
  constructor(
    @Inject(Renderer) renderer: Renderer,
    @Inject(ViewContainerRef) viewContainer: ViewContainerRef,
    @Optional() @Inject(Control) control?: LabelControl
  ) {
    super(renderer, viewContainer, control);
  }
}
