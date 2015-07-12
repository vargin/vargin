/// <reference path="../../../../typings/tsd.d.ts" />
import { Component, View, Inject, NgFor, NgModel } from 'angular2/angular2';

import BaseControl from 'core/controls/base-control';

import { ControlProperty } from 'core/controls/control-property';
import PropertyEditor from 'editor/properties/property-editor';

import ControlService from 'services/control-service';

@Component({
  selector: 'vargin-properties'
})

@View({
  template: `
    <section>
      <header>Properties</header>
      <property-editor *ng-for="#property of activeProperties" [property]="property">
      </property-editor>
    </section>
  `,
  directives: [NgFor, NgModel, PropertyEditor]
})

class VarginProperties {
  private activeProperties: Array<ControlProperty<any>>;
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
  }
}

export default VarginProperties;