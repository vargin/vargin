import { Component, Inject, Optional, View } from 'angular2/core';

import { IProperty, Property } from '../../../../core/property';

@Component({
  selector: 'string-property-editor',
  properties: ['property']
})
@View({
  template: `
    <label class="vargin-property-editor">
      <span class="vargin-property-editor__label">{{property.getName()}}</span>
      <input class="vargin-property-editor__input" type="text"
             [value]="property.getValue()"
             (change)="onChange($event.target.value)" />
    </label>`
})
export class PropertyEditor {
  private property: IProperty<string>;

  constructor(@Optional() @Inject(Property) property?: IProperty<string>) {
    this.property = property || new Property('[String]', '');
  }

  onChange(value: string) {
    this.property.setValue(value);
  }
}
