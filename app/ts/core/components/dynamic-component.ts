/// <reference path="../../../../typings/tsd.d.ts" />
import {
  bind,
  Component,
  DynamicComponentLoader,
  Inject,
  Injector,
  onChange,
  View,
  ViewContainerRef
} from 'angular2/angular2';

import { IControlComponent } from 'core/components/control-component';

import { ControlService } from 'services/control-service';

import BaseControl from 'core/controls/base-control';
import ComponentControlMap from 'core/components/component-control-map';

@Component({
  selector: 'vargin-dynamic',
  properties: ['control'],
  lifecycle: [onChange],
  host: {
    '(^click)': 'onClick($event)'
  }
})

@View({
  template: `<div #container></div>`
})

class DynamicComponent implements IControlComponent {
  private loader: DynamicComponentLoader;
  private viewContainer: ViewContainerRef;
  control: BaseControl;

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
        ComponentControlMap.getComponentType(this.control.meta.type),
        this.viewContainer.element,
        'container',
        Injector.resolve([bind(BaseControl).toValue(this.control)])
      )
    });
  }

  onClick(e) {
    e.stopPropagation();
    e.preventDefault();

    ControlService.selectControl(this.control);
  }
}

export default DynamicComponent;