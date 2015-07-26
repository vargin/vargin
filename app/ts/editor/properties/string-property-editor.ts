/// <reference path="../../../../typings/tsd.d.ts" />
import { Component, Inject, Optional, View } from 'angular2/angular2';

import { IProperty, Property } from 'core/property';

@Component({
  selector: 'string-property-editor',
  properties: ['property']
})
@View({
  template: `
    <label>{{property.getName()}} &nbsp;
      <input type="text"
        [value]="property.getValue()"
        (change)="onChange($event.target.value)"
      />
    </label>`
})
class StringPropertyEditor {
  private property: IProperty<string>;

  constructor(@Optional() @Inject(Property) property?: IProperty<string>) {
    this.property = property || new Property('[String]', '');
  }

  onChange(value: string) {
    this.property.setValue(value);
  }
}

export default StringPropertyEditor;