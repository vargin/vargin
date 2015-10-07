/// <reference path="../../../../typings/tsd.d.ts" />
import {
  bind,
  Component,
  DynamicComponentLoader,
  Inject,
  Injector,
  OnChanges,
  Renderer,
  Type,
  View,
  ViewContainerRef
} from 'angular2/angular2';

import { Control } from 'core/controls/control';
import { ControlGroup } from 'core/controls/control-group';

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
    super(renderer, viewContainer, this.control);

    this.loader = loader;
  }

  onChanges() {
    if (!this.control) {
      return;
    }

    let controlType = this.control.meta.type;
    let controlGroupType = ControlGroup.findByControlType(controlType).type;

    System.import(
      `editor/control-components/${controlGroupType}/${controlType}-component`
    ).then((module: any) => {
      return this.loader.loadIntoLocation(
        module.default,
        this.viewContainer.element,
        'container',
        Injector.resolve([bind(Control).toValue(this.control)])
      );
    });
  }
}
