import { Component, Inject, provide, View } from 'angular2/angular2';

import { IProperty, Property } from '../../../../../core/property';
import { Control } from '../../../../../core/controls/control';

import { DialogService } from '../../../services/dialog-service';

import { PropertyTreeDialog } from './tree-dialog';

@Component({
  selector: 'control-overrides-property-editor',
  properties: ['property']
})
@View({
  template: `
    <label class="vargin-property-editor">
      <span class="vargin-property-editor__label">{{property.getName()}}</span>
      <div class="vargin-property-editor__input flex-editor__input">
        <span class="flex-editor__input-value">{{getValue()}}</span>
        <button type="button" (click)="change()">...</button>
      </div>
    </label>`
})
export class PropertyEditor {
  private property: IProperty<Control>;

  constructor(@Inject(Property) property: IProperty<Control>) {
    this.property = property;
  }

  getValue() {
    return this.property.getValue().overrides.name;
  }

  change() {
    DialogService.show(
      PropertyTreeDialog,
      [provide(Control, { useValue: this.property.getValue() })]
    );
  }
}
