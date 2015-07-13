/// <reference path="../../../../typings/tsd.d.ts" />
import { Component, Inject, Optional, View } from 'angular2/angular2';

import { ControlProperty } from 'core/controls/control-property';

@Component({
  selector: 'string-property-editor',
  properties: ['property']
})

@View({
  template: `
    <label>{{property.name}} &nbsp;
      <input type="text"
        [value]="property.value"
        (change)="onChange($event.target.value)"
      />
    </label>`
})

class StringPropertyEditor {
  private property: ControlProperty<string>;

  constructor(
    @Optional() @Inject(ControlProperty) property?: ControlProperty<string>
  ) {
    this.property = property || new ControlProperty('[String]', '');
  }

  onChange(value) {
    this.property.value = value;
  }
}

export default StringPropertyEditor;