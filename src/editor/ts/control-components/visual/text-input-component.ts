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
import { TextInputControl } from '../../../../core/controls/visual/text-input-control';

import { BaseComponent } from '../base-component';

@Component({
  selector: 'vargin-input[vargin-type=text-input]',
  properties: ['control'],
  host: {
    '(click)': 'onClick($event)',
    '[style]': 'controlStyle'
  }
})
@View({
  template: `
    <input
      type="text"
      [placeholder]="getPropertyValue('placeholder')"
      [value]="getPropertyValue('value')"
    />
  `
})
export class TextInputComponent extends BaseComponent {
  constructor(
    @Inject(Renderer) renderer: Renderer,
    @Inject(ViewContainerRef) viewContainer: ViewContainerRef,
    @Inject(IterableDiffers) iterableDiffers: IterableDiffers,
    @Inject(ChangeDetectorRef) changeDetector: ChangeDetectorRef,
    @Inject(DynamicComponentLoader) loader: DynamicComponentLoader,
    @Optional() @Inject(Control) control?: TextInputControl
  ) {
    super(
      renderer, viewContainer, iterableDiffers, changeDetector, loader, control
    );
  }
}
