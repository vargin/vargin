/// <reference path="../../../../../typings/tsd.d.ts" />
import { Component, Inject, NgFor, Optional, View } from 'angular2/angular2';

import {
  IPropertyWithOptions,
  Property,
  PropertyWithOptions
} from 'core/property';

@Component({
  selector: 'property-with-options-editor',
  properties: ['property']
})
@View({
  template: `
    <label>{{property.getName()}} &nbsp;
      <select (change)="onChange($event.target.value)">
        <option
          *ng-for="#option of property.getOptions()"
          [value]="option.getValue()"
          [selected]="property.getValue() === option.getValue()">
          {{ option.getName() }}
          </option>
      </select>
    </label>
  `,
  directives: [NgFor]
})
class PropertyWithOptionsEditor {
  private property: IPropertyWithOptions<string>;

  constructor(
    @Optional() @Inject(Property) property?: IPropertyWithOptions<string>
  ) {
    this.property = property || new PropertyWithOptions<string>('[Name]', []);
  }

  onChange(value: string) {
    this.property.setValue(value);
  }
}

export default PropertyWithOptionsEditor;