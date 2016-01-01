import { Component, Inject, provide, View } from 'angular2/core';
import { NgFor } from 'angular2/common';
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
          <th class="vargin-table__header-cell" *ngFor="#field of schema.fields">
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
        <tr class="vargin-table__data-row" *ngFor="#item of items; #i = index">
          <td class="vargin-table__data-cell" *ngFor="#field of schema.fields;" (click)="change(i, item)">
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
    let properties = <Array<[string, string]>>this.schema.fields.map(
      (field) => [field.name, '']
    );

    DialogService.show(
      PropertyEditorDialog,
      [
        provide(Schema, { useValue: this.schema }),
        provide(Array, { useValue: properties })
      ]
    ).then(() => {
      if (properties.some(([key, value]) => !!value)) {
        this.items.push(new Map<string, string>(properties));
      }
    });
  }

  change(index: number, item: Map<string, string>) {
    let properties = <Array<[string, string]>>[];

    item.forEach((value, key) => {
      properties.push([key, value]);
    });

    DialogService.show(
      PropertyEditorDialog,
      [
        provide(Schema, { useValue: this.schema }),
        provide(Array, { useValue: properties })
      ]
    ).then(() => {
      if (properties.some(([key, value]) => !!value)) {
        properties.forEach(([key, value]) => {
          item.set(key, value);
        });
      } else {
        this.items.splice(index, 1);
      }
    });
  }

  remove(index: number) {
    this.items.splice(index, 1);
  }
}
