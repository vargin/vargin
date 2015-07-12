/// <reference path="../../../../typings/tsd.d.ts" />
import { Component, Inject, Optional, View } from 'angular2/angular2';

import { ControlProperty } from 'core/controls/control-property';

@Component({
  selector: 'number-property-editor',
  properties: ['property']
})

@View({
  template: `
    <label>{{property.name}} &nbsp;
      <input type="number"
        [value]="property.value"
        (change)="onKeyUp($event.target.value)"
      />
    </label>`
})

class NumberPropertyEditor {
  private property: ControlProperty<number>;

  constructor(
    @Optional() @Inject(ControlProperty) property?: ControlProperty<number>
  ) {
    this.property = property || new ControlProperty('[Number]', 0);
  }

  onKeyUp(value) {
    this.property.value = +value;
  }
}

export default NumberPropertyEditor;