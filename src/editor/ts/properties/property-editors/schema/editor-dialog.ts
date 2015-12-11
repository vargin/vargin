import { Component, Inject, View } from 'angular2/core';
import { NgFor, NgIf } from 'angular2/common';
import { Schema, SchemaFieldType } from '../../../../../core/data/schema';

@Component({
  selector: 'schema-property-editor-dialog'
})
@View({
  template: `
    <header class="property-editor-dialog__header">Define Schema</header>
    <ul class="vargin-list">
      <li class="vargin-list__item" *ngFor="#field of schema.fields; #i = index">
        <input #fieldname
               type="text"
               placeholder="Define field name"
               [value]="field.name"
               (keyup)="onFieldNameChange(i, fieldname.value)" />
        <select #fieldtype
                [value]="field.type"
                (change)="onFieldTypeChange(i, fieldtype.value)" >
          <option value="0">String</option>
          <option value="1">Number</option>
          <option value="2">Date</option>
          <option value="3">Binary</option>
          <option value="4">Boolean</option>
        </select>
        <button *ngIf="schema.fields.length > 1"
                class="vargin-list__remove-item"
                (click)="remove(i)">
          &#x274c;
        </button>
      </li>
    </ul>
    <button class="schema-field__add" (click)="add()">+ Add field</button>
  `,
  directives: [NgFor, NgIf]
})
export class PropertyEditorDialog {
  private schema: Schema;

  constructor(@Inject(Schema) schema: Schema) {
    this.schema = schema;

    if (!this.schema.fields.length) {
      this.add();
    }
  }

  private remove(index: number) {
    this.schema.fields.splice(index, 1);
  }

  private add() {
    this.schema.fields.push({
      name: '',
      type: SchemaFieldType.STRING
    });
  }

  private onFieldTypeChange(index: number, type: string) {
    this.schema.fields[index].type = +type;
  }

  private onFieldNameChange(index: number, name: string) {
    this.schema.fields[index].name = name;
  }
}
