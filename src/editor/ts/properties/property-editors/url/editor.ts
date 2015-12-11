import { Component, Inject, provide, View } from 'angular2/core';

import { IProperty, Property } from '../../../../../core/property';
import { Application } from '../../../../../core/application';
import { Address, AddressType } from '../../../../../core/data/address';
import { DialogService } from '../../../services/dialog-service';
import { PropertyEditorDialog } from './editor-dialog';

@Component({
  selector: 'url-property-editor',
  properties: ['property']
})
@View({
  template: `
    <label class="vargin-property-editor">
      <span class="vargin-property-editor__label">{{property.getName()}}</span>
      <div class="vargin-property-editor__input flex-editor__input">
        <span class="flex-editor__input-value" [title]="getValue()">
          {{getValue()}}
        </span>
        <button type="button" (click)="change()">...</button>
      </div>
    </label>`
})
export class PropertyEditor {
  private property: IProperty<string>;
  private application: Application;

  constructor(
    @Inject(Application) application: Application,
    @Inject(Property) property: IProperty<string>
  ) {
    this.application = application;
    this.property = property;
  }

  getValue() {
    let urlString = this.property.getValue();

    if (!urlString) {
      return '[Not defined]';
    }

    let address = Address.deserialize(urlString);

    if (address.type === AddressType.APP_PAGE) {
      let page = this.application.pages.find(
        (page) => page.id === address.value
      );

      if (page) {
        return page.name;
      }

      this.property.setValue('');
      return '[Not defined]';
    }

    return address.value;
  }

  change() {
    let urlString = this.property.getValue();
    let address = urlString ? Address.deserialize(urlString) : new Address();

    DialogService.show(
      PropertyEditorDialog, [provide(Address, { useValue: address })]
    ).then(() => {
      this.property.setValue(address.value ? Address.serialize(address) : '');
    });
  }
}
