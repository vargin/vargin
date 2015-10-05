/// <reference path="../../../../../../typings/tsd.d.ts" />
import {
  bind,
  Component,
  Inject,
  NgFor,
  NgIf,
  View
} from 'angular2/angular2';
import { Property } from 'core/property';
import { OwnedProperty } from 'core/owned-property';
import { Control } from 'core/controls/control';
import { DialogService } from 'services/dialog-service';
import { ItemsPropertyEditorDialog } from 'editor/properties/property-editors/items/editor-dialog';
import { Schema } from 'core/data/schema';

@Component({
  selector: 'items-property-list-dialog'
})
@View({
  template: `
    <header class="items-list-dialog__header">Edit Items</header>
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
          <td><button (click)="addItem()">+ Add item</button></td>
        </tr>
      </tfoot>
      <tbody>
        <tr class="vargin-table__data-row" *ng-for="#item of items; #i = index">
          <td class="vargin-table__data-cell" *ng-for="#field of schema.fields;">
            {{item.get(field.name)}}
          </td>
          <td class="vargin-table__data-cell">
            <button class="vargin-list__remove-item" (click)="removeItem(i)">
              &#x274c;
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  `,
  directives: [NgFor, NgIf]
})
export class ItemsPropertyListDialog {
  private schema: Schema;
  private items: Map<string, string>[];

  constructor(
    @Inject(Schema) schema: Schema,
    @Inject(Array) items: Map<string, string>[]
  ) {
    this.schema = schema;
    this.items = items;
  }

  addItem() {
    let newItem = <Array<[string, string]>>this.schema.fields.map((field) => {
      return [field.name, ''];
    });

    DialogService.show(
      ItemsPropertyEditorDialog,
      [bind(Schema).toValue(this.schema), bind(Array).toValue(newItem)]
    ).then(() => {
      if (newItem.some(([key, value]) => !!value)) {
        this.items.push(new Map<string, string>(newItem));
      }
    });
  }

  removeItem(index: number) {
    this.items.splice(index, 1);
  }
}
