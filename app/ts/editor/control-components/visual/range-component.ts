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
import { RangeControl } from 'core/controls/visual/range-control';
import { BaseComponent } from 'editor/control-components/base-component';

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
      [ng-style]="getControlStyles()"
      [min]="control.min.getValue()"
      [max]="control.max.getValue()"
      [step]="control.step.getValue()"
      [value]="control.value.getValue()"
    />
  `,
  directives: [NgStyle]
})
class RangeComponent extends BaseComponent {
  control: RangeControl;

  constructor(
    @Inject(Renderer) renderer: Renderer,
    @Inject(ViewContainerRef) viewContainer: ViewContainerRef,
    @Optional() @Inject(Control) control?: RangeControl
  ) {
    super(renderer, viewContainer, control);
  }
}

export default RangeComponent;
