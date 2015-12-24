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
import { ContainerControl } from '../../../../core/controls/visual/container-control';
import { BaseComponent } from '../base-component';

@Component({
  selector: 'div[vargin-type=container]',
  properties: ['control'],
  host: {
    '(click)': 'onClick($event)',
    '[class.vargin-component_drop-target]': 'dragEnterCounter > 0',
    '[style]': 'controlStyle',
    '(dragleave)': 'onDragLeave($event)',
    '(dragover)': 'onDragOver($event)',
    '(dragenter)': 'onDragEnter($event)',
    '(drop)': 'onDrop($event)'
  }
})
@View({
  template: `<div class="vargin-dynamic-anchor" #container hidden></div>`
})
export class ContainerComponent extends BaseComponent {
  constructor(
    @Inject(Renderer) renderer: Renderer,
    @Inject(ViewContainerRef) viewContainer: ViewContainerRef,
    @Inject(IterableDiffers) iterableDiffers: IterableDiffers,
    @Inject(ChangeDetectorRef) changeDetector: ChangeDetectorRef,
    @Inject(DynamicComponentLoader) loader: DynamicComponentLoader,
    @Optional() @Inject(Control) control?: ContainerControl
  ) {
    super(
      renderer, viewContainer, iterableDiffers, changeDetector, loader, control
    );
  }

  acceptDrop(typesToDrop: string[]) {
    return typesToDrop.indexOf('text/visual') >= 0;
  }
}
