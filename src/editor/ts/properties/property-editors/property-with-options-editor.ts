import { Component, Inject, Optional, View } from 'angular2/core';
import { NgFor } from 'angular2/common';

import {
  IPropertyWithOptions,
  Property,
  PropertyWithOptions
} from '../../../../core/property';

@Component({
  selector: 'property-with-options-editor',
  properties: ['property']
})
@View({
  template: `
    <label class="vargin-property-editor">
      <span class="vargin-property-editor__label">{{property.getName()}}</span>
      <select class="vargin-property-editor__input"
              (change)="onChange($event.target.value)">
        <option
          *ngFor="#option of property.getOptions()"
          [value]="option.getValue()"
          [selected]="property.getValue() === option.getValue()">
          {{ option.getName() }}
          </option>
      </select>
    </label>
  `,
  directives: [NgFor]
})
export class PropertyEditor {
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
