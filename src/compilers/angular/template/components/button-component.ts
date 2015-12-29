import {
  ChangeDetectorRef,
  Component,
  DynamicComponentLoader,
  Inject,
  IterableDiffers,
  View,
  ViewContainerRef
} from 'angular2/core';

import { ApplicationService } from '../services/application-service';
import { Control } from '../../../../core/controls/control';
import { BaseComponent } from './base-component';

@Component({
  selector: 'button[vargin-type=button]',
  properties: ['control'],
  host: {
    '[title]': 'control?.getProperty("title").getValue()',
    '[type]': 'control?.getProperty("type").getValue()',
    '[class]': 'cssClass',
    '(click)': 'onControlAction("click")'
  }
})
@View({
  template: '{{ control?.getProperty("text").getValue() }}'
})
export class ButtonComponent extends BaseComponent {
  constructor(
    @Inject(ViewContainerRef) viewContainer: ViewContainerRef,
    @Inject(IterableDiffers) iterableDiffers: IterableDiffers,
    @Inject(ChangeDetectorRef) changeDetector: ChangeDetectorRef,
    @Inject(DynamicComponentLoader) loader: DynamicComponentLoader,
    @Inject(ApplicationService) applicationService: ApplicationService,
    @Inject(Control) control: Control
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
