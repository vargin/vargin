import { Component, Inject, View } from 'angular2/core';
import { NgFor } from 'angular2/common';
import { IProperty, Property } from '../../../../../core/property';
import { Schema, SchemaFieldType } from '../../../../../core/data/schema';

@Component({
  selector: 'items-property-editor-dialog'
})
@View({
  template: `
    <header class="property-editor-dialog__header">Add Item</header>
    <ul class="vargin-list">
      <li class="vargin-list__item" *ngFor="#property of properties; #i = index">
        <label class="vargin-property-editor">
          <span class="vargin-property-editor__label">{{property[0]}}</span>
          <input class="vargin-property-editor__input" type="text"
                 [value]="property[1]"
                 (change)="onChange(i, $event.target.value)" />
        </label>
      </li>
    </ul>
    <button class="property-editor-dialog__save-button" (click)="dispose()">Save</button>
  `,
  directives: [NgFor]
})
export class PropertyEditorDialog {
  private schema: Schema;
  private properties: Array<[string, string]>;
  private dispose: Function;

  constructor(
    @Inject(Schema) schema: Schema,
    @Inject(Array) properties: Array<[string, string]>,
    @Inject('dispose') dispose: Function
  ) {
    this.schema = schema;
    this.properties = properties;
    this.dispose = dispose;
  }

  private onChange(index: number, value: string) {
    let field = this.schema.fields[index];

    let typedValue;
    switch (field.type) {
      case SchemaFieldType.NUMBER:
        typedValue = +value;
        break;
      case SchemaFieldType.BOOLEAN:
        typedValue = value.toLowerCase() === 'true';
        break;
      default:
        typedValue = value;
    }

    this.properties[index][1] = typedValue;
  }
}
