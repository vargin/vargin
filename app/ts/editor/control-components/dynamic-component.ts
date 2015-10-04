/// <reference path="../../../../typings/tsd.d.ts" />
import {
  bind,
  Component,
  DynamicComponentLoader,
  Inject,
  Injector,
  OnChanges,
  Renderer,
  View,
  ViewContainerRef
} from 'angular2/angular2';

import { Control } from 'core/controls/control';
import ComponentControlMap from 'editor/control-components/component-control-map';

import { BaseComponent } from 'editor/control-components/base-component';

@Component({
  selector: 'vargin-dynamic',
  properties: ['control']
})
@View({
  template: `<div class="vargin-dynamic-anchor" #container hidden></div>`
})
export class DynamicComponent extends BaseComponent implements OnChanges {
  private loader: DynamicComponentLoader;
  control: Control;

  constructor(
    @Inject(Renderer) renderer: Renderer,
    @Inject(ViewContainerRef) viewContainer: ViewContainerRef,
    @Inject(DynamicComponentLoader) loader: DynamicComponentLoader
  ) {
    super(this.control, renderer, viewContainer);

    this.loader = loader;
  }

  onChanges() {
    if (!this.control) {
      return;
    }

    this.loader.loadIntoLocation(
      ComponentControlMap.getComponentType(this.control.meta.type),
      this.viewContainer.element,
      'container',
      Injector.resolve([bind(Control).toValue(this.control)])
    );
  }
}
