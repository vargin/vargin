import {
  ChangeDetectorRef,
  Component,
  DynamicComponentLoader,
  Inject,
  IterableDiffers,
  OnChanges,
  Optional,
  Renderer,
  View,
  ViewContainerRef
} from 'angular2/core';

import { Control } from '../../../../core/controls/control';
import { ContainerControl } from '../../../../core/controls/visual/container-control';
import { BaseComponent } from '../base-component';

@Component({
  selector: 'div[vargin-type=service-container]',
  properties: ['control'],
  host: {
    '[class.vargin-component_drop-target]': 'dragEnterCounter > 0',
    '[style]': 'controlStyle',
    '(dragleave)': 'onDragLeave($event)',
    '(dragover)': 'onDragOver($event)',
    '(dragenter)': 'onDragEnter($event)',
    '(drop)': 'onDrop($event)'
  }
})
@View({
  template: '<div class="vargin-dynamic-anchor" #container hidden></div>'
})
export class ServiceContainerComponent extends BaseComponent implements OnChanges  {
  control: ContainerControl;

  constructor(
    @Inject(Renderer) renderer: Renderer,
    @Inject(ViewContainerRef) viewContainer: ViewContainerRef,
    @Inject(IterableDiffers) iterableDiffers: IterableDiffers,
    @Inject(ChangeDetectorRef) changeDetector: ChangeDetectorRef,
    @Inject(DynamicComponentLoader) loader: DynamicComponentLoader,
    @Optional() @Inject(Control) control: ContainerControl
  ) {
    super(
      renderer, viewContainer, iterableDiffers, changeDetector, loader, control
    );
  }

  acceptDrop(typesToDrop: string[]) {
    return typesToDrop.indexOf('text/service') >= 0;
  }

  ngOnChanges() {
    if (this.control) {
      this.setupStyles();
    }
  }

  private setupStyles() {
    this.control.getStyle('align-items').setValue('stretch');
    this.control.getStyle('display').setValue('flex');
    this.control.getStyle('min-height').setValue('0');
    this.control.getStyle('min-width').setValue('100%');
  }
}
