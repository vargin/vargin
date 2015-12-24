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
import { Overrides } from '../../../../core/overrides/overrides';
import {
  ListControl,
  ListItemControl
} from '../../../../core/controls/visual/list-control';
import { BaseComponent } from '../base-component';

import { UtilsService } from '../../../../core/services/utils-service';

@Component({
  selector: 'div[vargin-type=list]',
  properties: ['control'],
  host: {
    '(click)': 'onClick($event)',
    '[style]': 'controlStyle'
  }
})
@View({
  template: '<div class="vargin-dynamic-anchor" #container hidden></div>'
})
export class ListComponent extends BaseComponent {
  control: ListControl;
  templates: ListItemControl[];

  constructor(
    @Inject(Renderer) renderer: Renderer,
    @Inject(ViewContainerRef) viewContainer: ViewContainerRef,
    @Inject(IterableDiffers) iterableDiffers: IterableDiffers,
    @Inject(ChangeDetectorRef) changeDetector: ChangeDetectorRef,
    @Inject(DynamicComponentLoader) loader: DynamicComponentLoader,
    @Optional() @Inject(Control) control?: ListControl
  ) {
    super(
      renderer, viewContainer, iterableDiffers, changeDetector, loader, control
    );

    let template = this.control.getTemplate();
    this.templates = [template, template, template];
  }

  getChildren() {
    return this.templates;
  }
}
