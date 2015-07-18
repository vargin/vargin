/// <reference path="../../../../typings/tsd.d.ts" />
import { Component, Inject, Optional, View } from 'angular2/angular2';

import { IProperty, Property } from 'core/property';

@Component({
  selector: 'number-property-editor',
  properties: ['property']
})

@View({
  template: `
    <label>{{property.getName()}} &nbsp;
      <input type="number"
        [value]="property.getValue()"
        (change)="onChange($event.target.value)"
      />
    </label>`
})

class NumberPropertyEditor {
  private property: IProperty<number>;

  constructor(@Optional() @Inject(Property) property?: IProperty<number>) {
    this.property = property || new Property('[Number]', 0);
  }

  onChange(value: string) {
    this.property.setValue(+value);
  }
}

export default NumberPropertyEditor;