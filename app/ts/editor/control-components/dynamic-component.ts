/// <reference path="../../../../typings/tsd.d.ts" />
import {
  Component,
  DynamicComponentLoader,
  Inject,
  Injector,
  OnChanges,
  provide,
  Renderer,
  Type,
  View,
  ViewContainerRef
} from 'angular2/angular2';

import { Control } from 'core/controls/control';

import { ControlConfigService } from 'services/control-config-service';

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

    ControlConfigService.loadComponentType(controlType).then((type: Type) => {
      return this.loader.loadIntoLocation(
        type,
        this.viewContainer.element,
        'container',
        Injector.resolve([provide(Control, { useValue: this.control })])
      );
    });
  }
}
