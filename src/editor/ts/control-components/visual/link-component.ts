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
import { LinkControl } from 'core/controls/visual/link-control';
import { BaseComponent } from 'editor/ts/control-components/base-component';

@Component({
  selector: 'vargin-link',
  properties: ['control'],
  host: {
    '(click)': 'onClick($event)'
  }
})
@View({
  template: `
    <a
      href="javascript:void(0)"
      [title]="getPropertyValue('title')"
      [target]="getPropertyValue('target')"
      [ng-style]="getControlStyles()">
      {{ getPropertyValue('text') }}
    </a>
  `,
  directives: [NgStyle]
})
export class LinkComponent extends BaseComponent {
  constructor(
    @Inject(Renderer) renderer: Renderer,
    @Inject(ViewContainerRef) viewContainer: ViewContainerRef,
    @Optional() @Inject(Control) control?: LinkControl
  ) {
    super(renderer, viewContainer, control);
  }
}
