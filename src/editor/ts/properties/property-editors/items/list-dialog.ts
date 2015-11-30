import { Component, Inject, NgFor, provide, View } from 'angular2/angular2';
import { Property } from '../../../../../core/property';
import { Control } from '../../../../../core/controls/control';
import { DialogService } from '../../../services/dialog-service';
import { PropertyEditorDialog } from './editor-dialog';
import { Schema } from '../../../../../core/data/schema';

@Component({
  selector: 'items-property-list-dialog'
})
@View({
  template: `
    <header class="property-list-dialog__header">Edit Items</header>
    <table class="vargin-table">
      <thead>
        <tr class="vargin-table__header-row">
          <th class="vargin-table__header-cell" *ng-for="#field of schema.fields">
            {{field.name}}
          </th>
          <th></th>
        </tr>
      </thead>
      <tfoot>
        <tr class="vargin-table__footer-row">
          <td><button (click)="add()">+ Add item</button></td>
        </tr>
      </tfoot>
      <tbody>
        <tr class="vargin-table__data-row" *ng-for="#item of items; #i = index">
          <td class="vargin-table__data-cell" *ng-for="#field of schema.fields;">
            {{item.get(field.name)}}
          </td>
          <td class="vargin-table__data-cell">
            <button class="vargin-list__remove-item" (click)="remove(i)">
              &#x274c;
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  `,
  directives: [NgFor]
})
export class PropertyListDialog {
  private schema: Schema;
  private items: Map<string, string>[];

  constructor(
    @Inject(Schema) schema: Schema,
    @Inject(Array) items: Map<string, string>[]
  ) {
    this.schema = schema;
    this.items = items;
  }

  add() {
    let newItem = <Array<[string, string]>>this.schema.fields.map((field) => {
      return [field.name, ''];
    });

    DialogService.show(
      PropertyEditorDialog,
      [
        provide(Schema, { useValue: this.schema }),
        provide(Array, { useValue: newItem })
      ]
    ).then(() => {
      if (newItem.some(([key, value]) => !!value)) {
        this.items.push(new Map<string, string>(newItem));
      }
    });
  }

  remove(index: number) {
    this.items.splice(index, 1);
  }
}
