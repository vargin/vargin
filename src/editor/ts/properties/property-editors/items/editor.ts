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
      <div class="vargin-property-editor__input flex-editor__input">
        <span class="flex-editor__input-value">{{getValue()}}</span>
        <button type="button" (click)="change()">...</button>
      </div>
    </label>`
})
export class PropertyEditor {
  private property: OwnedProperty<string, Control>;

  constructor(@Inject(Property) property: OwnedProperty<string, Control>) {
    this.property = property;
  }

  getValue() {
    if (!this.getSchema()) {
      return '[No schema]';
    }

    return this.property.getValue() ? '[Defined]' : '[Not Defined]';
  }

  change() {
    let serializedSchema = this.getSchema();

    if (!serializedSchema) {
      return;
    }

    let itemsJSON = this.property.getValue();
    let items = itemsJSON ? JSON.parse(itemsJSON).map(
      (propertyMap: [string, string][]) => new Map(propertyMap)
    ) : [];

    DialogService.show(
      PropertyListDialog,
      [
        provide(Schema, { useValue: Schema.deserialize(serializedSchema) }),
        provide(Array, { useValue: items })
      ]
    ).then(() => {
      if (items.length) {
        this.property.setValue(JSON.stringify(
          items.map((map) => {
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

  private getSchema() {
    return this.property.owner.getProperty('schema').getValue();
  }
}
