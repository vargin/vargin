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
  selector: 'vargin-input[vargin-type=text-input]',
  properties: ['control'],
  host: {
    '[class]': 'cssClass'
  }
})
@View({
  template: `
    <input
      type="text"
      [placeholder]="control?.getProperty('placeholder').getValue()"
      [value]="control?.getProperty('value').getValue()"
    />
  `
})
export class TextInputComponent extends BaseComponent {
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
