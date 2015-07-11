/// <reference path="../../../../typings/tsd.d.ts" />
import {
  bind,
  Component,
  DynamicComponentLoader,
  Inject,
  Injector,
  onChange,
  View,
  ViewContainerRef,
    ComponentRef
} from 'angular2/angular2';

import BaseControl from 'core/controls/base';
import ComponentControlMap from 'core/components/component-control-map';

@Component({
  selector: 'vargin-dynamic',
  properties: ['control'],
  lifecycle: [onChange]
})

@View({
  template: `<div #container></div>`
})

class DynamicComponent{
  private loader: DynamicComponentLoader;
  private viewContainer: ViewContainerRef;
  private control: BaseControl;

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

    setTimeout(() => {
      this.loader.loadIntoLocation(
        ComponentControlMap.getComponentType(this.control),
        this.viewContainer.element,
        'container',
        Injector.resolve([bind(BaseControl).toValue(this.control)])
      )
    });
  }
}

export default DynamicComponent;