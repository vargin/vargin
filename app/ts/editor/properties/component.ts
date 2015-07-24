/// <reference path="../../../../typings/tsd.d.ts" />
import { Component, View, Inject, NgFor, NgModel } from 'angular2/angular2';

import BaseControl from 'core/controls/base-control';
import BaseVisualControl from 'core/controls/visual/base-visual-control';

import { IProperty } from 'core/property';
import PropertyEditor from 'editor/properties/property-editor';

import { ControlService } from 'services/control-service';

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
  private activeControl: BaseControl;

  constructor() {
    ControlService.controlSelected.toRx().subscribeOnNext(
      this.onControlSelected.bind(this)
    );
  }

  onControlSelected(control: BaseControl) {
    this.activeControl = control;

    this.activeProperties = [];
    control.meta.supportedProperties.forEach((property, propertyKey) => {
      this.activeProperties.push(control[propertyKey]);
    });

    if ('styles' in control) {
      this.activeStyleProperties = [];
      (<BaseVisualControl>control).styles.forEach((property) => {
        this.activeStyleProperties.push(property);
      });
    }
  }
}

export default VarginProperties;