import {
  Component, Inject, Optional, Renderer, View, ViewContainerRef
} from 'angular2/core';
import { NgStyle } from 'angular2/common';

import { Control } from '../../../../core/controls/control';
import { RangeControl } from '../../../../core/controls/visual/range-control';
import { BaseComponent } from '../base-component';

@Component({
  selector: 'vargin-range',
  properties: ['control'],
  host: {
    '(click)': 'onClick($event)'
  }
})
@View({
  template: `
    <input
      type="range"
      [ngStyle]="controlStyles"
      [min]="getPropertyValue('min')"
      [max]="getPropertyValue('max')"
      [step]="getPropertyValue('step')"
      [value]="getPropertyValue('value')"
    />
  `,
  directives: [NgStyle]
})
export class RangeComponent extends BaseComponent {
  constructor(
    @Inject(Renderer) renderer: Renderer,
    @Inject(ViewContainerRef) viewContainer: ViewContainerRef,
    @Optional() @Inject(Control) control?: RangeControl
  ) {
    super(renderer, viewContainer, control);
  }
}
