/// <reference path="../../../../typings/tsd.d.ts" />
import { Component, View, Inject, NgFor, NgModel } from 'angular2/angular2';

import BaseControl from 'core/controls/base-control';
import { BaseVisualControl } from 'core/controls/visual/base-visual-control';

import { IProperty } from 'core/property';
import PropertyEditor from 'editor/properties/property-editor';

import ControlService from 'services/control-service';

@Component({
  selector: 'vargin-properties'
})

@View({
  template: `
    <section>
      <section>
        <header>Properties</header>
        <property-editor *ng-for="#property of activeProperties" [property]="property">
        </property-editor>
      </section>
      <section>
        <header>Styles</header>
        <property-editor *ng-for="#property of activeStyleProperties" [property]="property">
        </property-editor>
      </section>
    </section>
  `,
  directives: [NgFor, NgModel, PropertyEditor]
})

class VarginProperties {
  private activeProperties: Array<IProperty<any>>;
  private activeStyleProperties: Array<IProperty<string>>;
  private activeControl: BaseControl<any>;
  private controlService: ControlService;

  constructor(@Inject(ControlService) controlService: ControlService) {
    this.controlService = controlService;

    this.controlService.controlSelected.toRx().subscribeOnNext(
      this.onControlSelected.bind(this)
    );
  }

  onControlSelected(control: BaseControl<any>) {
    this.activeControl = control;

    this.activeProperties = Object.keys(control.properties).map((key) => {
      return control.properties[key];
    });

    if ('getStyleList' in control) {
      this.activeStyleProperties =
        (<BaseVisualControl<any>>control).getStyleList();
    }
  }
}

export default VarginProperties;