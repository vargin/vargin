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
import { NgStyle } from 'angular2/common';

import { Control } from '../../../../core/controls/control';
import { LabelControl } from '../../../../core/controls/visual/label-control';
import { StringFormatter } from '../../../../core/tools/string-formatter';

import { BaseComponent } from '../base-component';

@Component({
  selector: 'span[vargin-type=label]',
  properties: ['control'],
  host: {
    '(click)': 'onClick($event)',
    '[style]': 'controlStyle'
  }
})
@View({
  template: '{{ getFormattedValue() }}',
  directives: [NgStyle]
})
export class LabelComponent extends BaseComponent {
  control: LabelControl;

  constructor(
    @Inject(Renderer) renderer: Renderer,
    @Inject(ViewContainerRef) viewContainer: ViewContainerRef,
    @Inject(IterableDiffers) iterableDiffers: IterableDiffers,
    @Inject(ChangeDetectorRef) changeDetector: ChangeDetectorRef,
    @Inject(DynamicComponentLoader) loader: DynamicComponentLoader,
    @Optional() @Inject(Control) control?: LabelControl
  ) {
    super(
      renderer, viewContainer, iterableDiffers, changeDetector, loader, control
    );
  }

  getFormattedValue() {
    let value = this.control.getProperty('text').getValue();

    if (value.startsWith('bind:')) {
      return value;
    }

    try {
      return StringFormatter.format(
        value, +this.control.getProperty('format').getValue()
      );
    } catch (e) {
      return '[Format Error]';
    }
  }
}
