/// <reference path="../../../../../typings/tsd.d.ts" />
import {
  Component,
  DomRenderer,
  Inject,
  NgStyle,
  Optional,
  View,
  ViewContainerRef
} from 'angular2/angular2';

import { Control } from 'core/controls/control';
import { RangeControl } from 'core/controls/visual/range-control';

import { ControlService } from 'services/control-service';

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
    @Inject(DomRenderer) renderer: DomRenderer,
    @Inject(ViewContainerRef) viewContainer: ViewContainerRef,
    @Optional() @Inject(Control) control?: RangeControl
  ) {
    super(
      control || ControlService.create(RangeControl),
      renderer,
      viewContainer
    );
  }
}

export default RangeComponent;
