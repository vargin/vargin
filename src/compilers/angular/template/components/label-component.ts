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
import { StringFormatPipe } from '../pipes/string-format';

@Component({
  selector: 'span[vargin-type=label]',
  properties: ['control'],
  host: {
    '[class]': 'cssClass',
    '[title]': 'title',
    '(click)': 'onControlAction("click")'
  }
})
@View({
  template: '{{ value | stringformat: format }}',
  pipes: [StringFormatPipe]
})
export class LabelComponent extends BaseComponent {
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

  get value() {
    return this.control.getProperty('text').getValue();
  }

  get title() {
    return this.control.getProperty('title').getValue();
  }

  get format() {
    return this.control.getProperty('format').getValue();
  }
}
