/// <reference path="../../../../typings/tsd.d.ts" />
import { Component, Inject, NgFor, Optional, View } from 'angular2/angular2';

import {
  ControlProperty,
  PredefinedControlProperty
} from 'core/controls/control-property';

@Component({
  selector: 'predefined-property-editor',
  properties: ['property']
})

@View({
  template: `
    <label>{{property.name}} &nbsp;
      <select (change)="onChange($event.target.value)">
        <option
          *ng-for="#option of property.options"
          [value]="option.value"
          [selected]="property.value === option.value">
          {{ option.name }}
          </option>
      </select>
    </label>
  `,
  directives: [NgFor]
})

class PredefinedPropertyEditor {
  private property: PredefinedControlProperty;

  constructor(
    @Optional() @Inject(ControlProperty) property?: PredefinedControlProperty
  ) {
    this.property = property || new PredefinedControlProperty('[Name]', []);
  }

  onChange(value) {
    this.property.value = value;
  }
}

export default PredefinedPropertyEditor;