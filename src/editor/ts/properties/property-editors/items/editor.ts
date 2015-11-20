import { Component, Inject, provide, View } from 'angular2/angular2';

import { IProperty, Property } from '../../../../../core/property';
import { OwnedProperty } from '../../../../../core/owned-property';
import { Control } from '../../../../../core/controls/control';
import { DialogService } from '../../../services/dialog-service';
import { PropertyListDialog } from './list-dialog';
import { Schema } from '../../../../../core/data/schema';

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
        <button type="button" (click)="change()">...</button>
      </div>
    </label>`
})
export class PropertyEditor {
  private property: OwnedProperty<string, Control>;
  private items: Map<string, string>[] = [];

  constructor(@Inject(Property) property: OwnedProperty<string, Control>) {
    this.property = property;

    if (this.hasSchema()) {
      let itemsJSON = this.property.getValue();
      if (itemsJSON) {
        this.items = JSON.parse(itemsJSON).map(
          (propertyMap: [string, string][]) => {
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

  change() {
    if (!this.hasSchema()) {
      return;
    }

    let serializedSchema = this.property.owner.getProperty('schema').getValue();

    DialogService.show(
      PropertyListDialog,
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
    return !!this.property.owner.getProperty('schema').getValue();
  }
}
