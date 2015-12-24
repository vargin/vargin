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
import { LinkControl } from '../../../../core/controls/visual/link-control';
import { BaseComponent } from '../base-component';

@Component({
  selector: 'a[vargin-type=link]',
  properties: ['control'],
  host: {
    '(click)': 'onClick($event)',
    '[title]': 'getPropertyValue("title")',
    '[target]': 'getPropertyValue("target")',
    'href': 'javascript:void(0)',
    '[style]': 'controlStyle'
  }
})
@View({
  template: '{{ getPropertyValue("text") }}'
})
export class LinkComponent extends BaseComponent {
  constructor(
    @Inject(Renderer) renderer: Renderer,
    @Inject(ViewContainerRef) viewContainer: ViewContainerRef,
    @Inject(IterableDiffers) iterableDiffers: IterableDiffers,
    @Inject(ChangeDetectorRef) changeDetector: ChangeDetectorRef,
    @Inject(DynamicComponentLoader) loader: DynamicComponentLoader,
    @Optional() @Inject(Control) control?: LinkControl
  ) {
    super(
      renderer, viewContainer, iterableDiffers, changeDetector, loader, control
    );
  }
}
