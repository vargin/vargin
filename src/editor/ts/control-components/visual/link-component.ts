import {
  Component, Inject, Optional, Renderer, View, ViewContainerRef
} from 'angular2/core';
import { NgStyle } from 'angular2/common';

import { Control } from '../../../../core/controls/control';
import { LinkControl } from '../../../../core/controls/visual/link-control';
import { BaseComponent } from '../base-component';

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
      [ngStyle]="controlStyles">
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
