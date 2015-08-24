/// <reference path="../../../../typings/tsd.d.ts" />
import {
  bind,
  Component,
  DynamicComponentLoader,
  ElementRef,
  Inject,
  Injector,
  LifecycleEvent,
  View
} from 'angular2/angular2';

import { ControlService } from 'services/control-service';

import { Control } from 'core/controls/control';
import ComponentControlMap from 'editor/control-components/component-control-map';

import { BaseComponent } from 'editor/control-components/base-component';

@Component({
  selector: 'vargin-dynamic',
  properties: ['control'],
  lifecycle: [LifecycleEvent.onChange]
})
@View({
  template: `<div class="vargin-dynamic-anchor" #container hidden></div>`
})
class DynamicComponent extends BaseComponent {
  private loader: DynamicComponentLoader;
  private element: ElementRef;
  control: Control;

  constructor(
    @Inject(DynamicComponentLoader) loader: DynamicComponentLoader,
    @Inject(ElementRef) element: ElementRef
  ) {
    super(this.control);

    this.loader = loader;
    this.element = element;
  }

  onChange() {
    if (!this.control) {
      return;
    }

    this.loader.loadIntoLocation(
      ComponentControlMap.getComponentType(this.control.meta.type),
      this.element,
      'container',
      Injector.resolve([bind(Control).toValue(this.control)])
    )
  }
}

export default DynamicComponent;