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
import { ButtonControl } from '../../../../core/controls/visual/button-control';
import { BaseComponent } from '../base-component';

@Component({
  selector: 'button[vargin-type=button]',
  properties: ['control'],
  host: {
    '(click)': 'onClick($event)',
    '[title]': 'getPropertyValue("title")',
    '[type]': 'getPropertyValue("type")',
    '[style]': 'controlStyle'
  }
})
@View({
  template: '{{ getPropertyValue("text") }}'
})
export class ButtonComponent extends BaseComponent {
  constructor(
    @Inject(Renderer) renderer: Renderer,
    @Inject(ViewContainerRef) viewContainer: ViewContainerRef,
    @Inject(IterableDiffers) iterableDiffers: IterableDiffers,
    @Inject(ChangeDetectorRef) changeDetector: ChangeDetectorRef,
    @Inject(DynamicComponentLoader) loader: DynamicComponentLoader,
    @Optional() @Inject(Control) control?: ButtonControl
  ) {
    super(
      renderer, viewContainer, iterableDiffers, changeDetector, loader, control
    );
  }
}
