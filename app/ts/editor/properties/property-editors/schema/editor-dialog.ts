/// <reference path="../../../../../../typings/tsd.d.ts" />
import { Component, Inject, NgFor, NgIf, View } from 'angular2/angular2';
import { IProperty, Property } from 'core/property';

interface ISchemaField {
  name: string;
  type: string;
}

@Component({
  selector: 'schema-property-editor-dialog'
})
@View({
  template: `
    <header class="schema-editor-dialog__header">Define Schema</header>
    <ul class="vargin-list">
      <li class="vargin-list__item" *ng-for="#field of schema; #i = index">
        <input #fieldname
               type="text"
               placeholder="Define field name"
               [value]="field.name"
               (keyup)="onFieldNameChange(i, fieldname.value)" />
        <select #fieldtype
                [value]="field.type"
                (change)="onFieldTypeChange(i, fieldtype.value)" >
          <option value="string">String</option>
          <option value="number">Number</option>
          <option value="image">Image</option>
        </select>
        <button *ng-if="schema.length > 1"
                class="vargin-list__remove-item"
                (click)="removeField(i)">
          &#x274c;
        </button>
      </li>
    </ul>
    <button class="schema-field__add" (click)="addField()">+ Add field</button>
  `,
  directives: [NgFor, NgIf]
})
export class SchemaPropertyEditorDialog {
  private property: IProperty<string>;
  private schema: ISchemaField[] = [];

  constructor(@Inject(Property) property: IProperty<string>) {
    this.property = property;

    let schemaJSON = this.property.getValue();
    this.schema = schemaJSON ? JSON.parse(schemaJSON) : [];

    if (!this.schema.length) {
      this.addField();
    }
  }

  private removeField(index) {
    this.schema.splice(index, 1);

    this.refreshProperty();
  }

  private addField() {
    this.schema.push({
      name: '',
      type: 'string'
    });
  }

  private onFieldTypeChange(index: number, type: string) {
    this.schema[index].type = type;

    this.refreshProperty();
  }

  private onFieldNameChange(index: number, name: string) {
    this.schema[index].name = name;

    this.refreshProperty();
  }

  private refreshProperty() {
    this.property.setValue(
      JSON.stringify(this.schema.filter((field) => field.name && field.type))
    );
  }
}
