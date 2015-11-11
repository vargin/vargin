import { Component, Inject, NgFor, NgIf, View } from 'angular2/angular2';
import { IProperty, Property } from '../../../../../core/property';
import { Schema } from '../../../../../core/data/schema';

@Component({
  selector: 'items-property-editor-dialog'
})
@View({
  template: `
    <header class="items-editor-dialog__header">Add Item</header>
    <ul class="vargin-list">
      <li class="vargin-list__item" *ng-for="#property of properties; #i = index">
        <label class="vargin-property-editor">
          <span class="vargin-property-editor__label">{{property[0]}}</span>
          <input class="vargin-property-editor__input" type="text"
                 [value]="property[1]"
                 (change)="onChange(i, $event.target.value)" />
        </label>
      </li>
    </ul>
    <button class="items-editor-dialog__save" (click)="dispose()">Save</button>
  `,
  directives: [NgFor, NgIf]
})
export class ItemsPropertyEditorDialog {
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
    this.properties[index][1] = value;
  }
}
