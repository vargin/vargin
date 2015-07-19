/// <reference path="../../../../typings/tsd.d.ts" />
import { Component, Inject, Optional, View } from 'angular2/angular2';

import { IProperty, Property } from 'core/property';

@Component({
  selector: 'color-property-editor',
  properties: ['property']
})

@View({
  template: `
    <label>{{property.getName()}} &nbsp;
      <input type="color"
        [value]="property.getValue()"
        (change)="onChange($event.target.value)"
      />
    </label>`
})

class ColorPropertyEditor {
  private property: IProperty<string>;

  constructor(@Optional() @Inject(Property) property?: IProperty<string>) {
    this.property = property || new Property('[Color]', '');
  }

  onChange(value: string) {
    this.property.setValue(value);
  }
}

export default ColorPropertyEditor;