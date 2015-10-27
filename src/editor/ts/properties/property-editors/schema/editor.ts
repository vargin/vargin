/// <reference path="../../../../../../typings/tsd.d.ts" />
import { Component, Inject, provide, View } from 'angular2/angular2';

import { IProperty, Property } from 'core/property';
import { DialogService } from 'editor/ts/services/dialog-service';
import { SchemaPropertyEditorDialog } from 'editor/ts/properties/property-editors/schema/editor-dialog';
import { Schema } from 'core/data/schema';

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
        <button type="button" (click)="changeSchema()">...</button>
      </div>
    </label>`
})
export class SchemaPropertyEditor {
  private property: IProperty<string>;
  private schema: Schema;

  constructor(@Inject(Property) property: IProperty<string>) {
    this.property = property;

    let propertyValue = this.property.getValue();
    this.schema = propertyValue ?
      Schema.deserialize(propertyValue) : new Schema();
  }

  getValue() {
    return this.property.getValue() ? '[Defined]' : '[Not defined]';
  }

  changeSchema() {
    DialogService.show(
      SchemaPropertyEditorDialog, [provide(Schema, { useValue: this.schema })]
    ).then(() => {
      this.schema.fields = this.schema.fields.filter((field) => !!field.name);

      this.property.setValue(
        this.schema.fields.length ? Schema.serialize(this.schema) : ''
      );
    });
  }
}
