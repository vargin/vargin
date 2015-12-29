import {
  ChangeDetectorRef,
  Component,
  DynamicComponentLoader,
  Inject,
  IterableDiffers,
  Optional,
  View,
  ViewContainerRef
} from 'angular2/core';

import { ApplicationService } from '../services/application-service';
import { Control } from '../../../../core/controls/control';
import { BaseComponent } from './base-component';

@Component({
  selector: 'div[vargin-type=container]',
  properties: ['control'],
  inputs: ['control'],
  host: {
    '[class]': 'cssClass'
  }
})
@View({
  template: `<div class="vargin-dynamic-anchor" #container hidden></div>`
})
export class ContainerComponent extends BaseComponent {
  constructor(
    @Inject(ViewContainerRef) viewContainer: ViewContainerRef,
    @Inject(IterableDiffers) iterableDiffers: IterableDiffers,
    @Inject(ChangeDetectorRef) changeDetector: ChangeDetectorRef,
    @Inject(DynamicComponentLoader) loader: DynamicComponentLoader,
    @Inject(ApplicationService) applicationService: ApplicationService,
    @Optional() @Inject(Control) control?: Control
  ) {
    super(
      viewContainer,
      iterableDiffers,
      changeDetector,
      loader,
      applicationService,
      control
    );
  }
}
