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

import ControlService from 'services/control-service';

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

class DynamicComponent{
  private loader: DynamicComponentLoader;
  private viewContainer: ViewContainerRef;
  private controlService: ControlService;
  private control: BaseControl<any>;

  constructor(
    @Inject(DynamicComponentLoader) loader: DynamicComponentLoader,
    @Inject(ViewContainerRef) viewContainer: ViewContainerRef,
    @Inject(ControlService) controlService: ControlService
  ) {
    this.loader = loader;
    this.viewContainer = viewContainer;
    this.controlService = controlService;
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

  onClick(e) {
    e.stopPropagation();
    e.preventDefault();

    this.controlService.selectControl(this.control);
  }
}

export default DynamicComponent;