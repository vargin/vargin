/// <reference path="../../../../../../typings/tsd.d.ts" />
import { Component, Inject, provide, View } from 'angular2/angular2';

import { IProperty, Property } from 'core/property';
import { OwnedProperty } from 'core/owned-property';
import { Control } from 'core/controls/control';
import { DialogService } from 'editor/ts/services/dialog-service';
import { ItemsPropertyListDialog } from 'editor/ts/properties/property-editors/items/list-dialog';
import { Schema } from 'core/data/schema';

@Component({
  selector: 'items-property-editor',
  properties: ['property']
})
@View({
  template: `
    <label class="vargin-property-editor">
      <span class="vargin-property-editor__label">{{property.getName()}}</span>
      <div class="vargin-property-editor__input items-editor__input">
        <span class="items-editor__input-value">{{getValue()}}</span>
        <button type="button" (click)="changeItems()">...</button>
      </div>
    </label>`
})
export class ItemsPropertyEditor {
  private property: OwnedProperty<string, Control>;
  private items: Map<string, string>[] = [];

  constructor(@Inject(Property) property: OwnedProperty<string, Control>) {
    this.property = property;

    if (this.hasSchema()) {
      let itemsJSON = this.property.getValue();
      if (itemsJSON) {
        this.items = JSON.parse(itemsJSON).map(
          (propertyMap: Iterable<[string, string]>) => {
            return new Map(propertyMap);
          }
        );
      }
    }
  }

  getValue() {
    if (!this.hasSchema()) {
      return '[No schema]';
    }

    return `[${this.items.length} items]`;
  }

  changeItems() {
    if (!this.hasSchema()) {
      return;
    }

    let serializedSchema = this.property.owner['schema'].getValue();

    DialogService.show(
      ItemsPropertyListDialog,
      [
        provide(Schema, { useValue: Schema.deserialize(serializedSchema) }),
        provide(Array, { useValue: this.items })
      ]
    ).then(() => {
      if (this.items.length) {
        this.property.setValue(JSON.stringify(
          this.items.map((map) => {
            let itemProperties: Array<[string, string]> = [];
            map.forEach((value, key) => itemProperties.push([key, value]));
            return itemProperties;
          })
        ));
      } else {
        this.property.setValue('');
      }
    });
  }

  private hasSchema() {
    return !!this.property.owner['schema'].getValue();
  }
}
