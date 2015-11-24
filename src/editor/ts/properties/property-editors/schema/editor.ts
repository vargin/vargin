import { Component, Inject, provide, View } from 'angular2/angular2';

import { IProperty, Property } from '../../../../../core/property';
import { DialogService } from '../../../services/dialog-service';
import { PropertyEditorDialog } from './editor-dialog';
import { Schema } from '../../../../../core/data/schema';

@Component({
  selector: 'schema-property-editor',
  properties: ['property']
})
@View({
  template: `
    <label class="vargin-property-editor">
      <span class="vargin-property-editor__label">{{property.getName()}}</span>
      <div class="vargin-property-editor__input schema-editor__input">
        <span class="schema-editor__input-value">{{getValue()}}</span>
        <button type="button" (click)="change()">...</button>
      </div>
    </label>`
})
export class PropertyEditor {
  private property: IProperty<string>;

  constructor(@Inject(Property) property: IProperty<string>) {
    this.property = property;
  }

  getValue() {
    return this.property.getValue() ? '[Defined]' : '[Not defined]';
  }

  change() {
    let propertyValue = this.property.getValue();
    let schema = propertyValue ?
      Schema.deserialize(propertyValue) : new Schema();

    DialogService.show(
      PropertyEditorDialog, [provide(Schema, { useValue: schema })]
    ).then(() => {
      schema.fields = schema.fields.filter((field) => !!field.name);

      this.property.setValue(
        schema.fields.length ? Schema.serialize(schema) : ''
      );
    });
  }
}
