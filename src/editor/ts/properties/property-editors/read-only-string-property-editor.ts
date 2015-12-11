import { Component, Inject, Optional, View } from 'angular2/core';

import { IProperty, Property } from '../../../../core/property';

@Component({
  selector: 'read-only-string-property-editor',
  properties: ['property']
})
@View({
  template: `
    <label class="vargin-property-editor">
      <span class="vargin-property-editor__label">{{property.getName()}}</span>
      <input class="vargin-property-editor__input vargin-property-editor__input-read-only"
             type="text" readonly
             [value]="property.getValue()" />
    </label>`
})
export class PropertyEditor {
  private property: IProperty<string>;

  constructor(@Optional() @Inject(Property) property?: IProperty<string>) {
    this.property = property || new Property('[String]', '');
  }
}
