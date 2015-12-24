import {
  ChangeDetectorRef,
  Component,
  DynamicComponentLoader,
  Inject,
  IterableDiffers,
  Optional,
  Renderer,
  View,
  ViewContainerRef
} from 'angular2/core';

import { Control } from '../../../../core/controls/control';
import { RangeControl } from '../../../../core/controls/visual/range-control';
import { BaseComponent } from '../base-component';

@Component({
  selector: 'vargin-input[vargin-type=range]',
  properties: ['control'],
  host: {
    '(click)': 'onClick($event)',
    '[style]': 'controlStyle'
  }
})
@View({
  template: `
    <input
      type="range"
      [min]="getPropertyValue('min')"
      [max]="getPropertyValue('max')"
      [step]="getPropertyValue('step')"
      [value]="getPropertyValue('value')"
    />
  `
})
export class RangeComponent extends BaseComponent {
  constructor(
    @Inject(Renderer) renderer: Renderer,
    @Inject(ViewContainerRef) viewContainer: ViewContainerRef,
    @Inject(IterableDiffers) iterableDiffers: IterableDiffers,
    @Inject(ChangeDetectorRef) changeDetector: ChangeDetectorRef,
    @Inject(DynamicComponentLoader) loader: DynamicComponentLoader,
    @Optional() @Inject(Control) control?: RangeControl
  ) {
    super(
      renderer, viewContainer, iterableDiffers, changeDetector, loader, control
    );
  }
}
