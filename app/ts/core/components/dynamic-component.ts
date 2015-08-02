/// <reference path="../../../../typings/tsd.d.ts" />
import {
  bind,
  Component,
  DynamicComponentLoader,
  Inject,
  Injector,
  LifecycleEvent,
  View,
  ViewContainerRef
} from 'angular2/angular2';

import { IControlComponent } from 'core/components/control-component';

import { ControlService } from 'services/control-service';

import { Control } from 'core/controls/control';
import ComponentControlMap from 'core/components/component-control-map';

@Component({
  selector: 'vargin-dynamic',
  properties: ['control'],
  lifecycle: [LifecycleEvent.onChange]
})
@View({
  template: `<div class="vargin-dynamic-anchor" #container></div>`
})
class DynamicComponent implements IControlComponent {
  private loader: DynamicComponentLoader;
  private viewContainer: ViewContainerRef;
  control: Control;

  constructor(
    @Inject(DynamicComponentLoader) loader: DynamicComponentLoader,
    @Inject(ViewContainerRef) viewContainer: ViewContainerRef
  ) {
    this.loader = loader;
    this.viewContainer = viewContainer;
  }

  onChange() {
    if (!this.control) {
      return;
    }

    this.loader.loadIntoLocation(
      ComponentControlMap.getComponentType(this.control.meta.type),
      this.viewContainer.element,
      'container',
      Injector.resolve([bind(Control).toValue(this.control)])
    )
  }
}

export default DynamicComponent;