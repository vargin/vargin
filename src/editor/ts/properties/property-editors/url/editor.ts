import { Component, Inject, provide, View } from 'angular2/angular2';

import { IProperty, Property } from '../../../../../core/property';
import { Address, AddressType } from '../../../../../core/data/address';
import { DialogService } from '../../../services/dialog-service';
import { URLPropertyEditorDialog } from './editor-dialog';
import { ApplicationService } from '../../../../../core/services/application-service';

@Component({
  selector: 'url-property-editor',
  properties: ['property']
})
@View({
  template: `
    <label class="vargin-property-editor">
      <span class="vargin-property-editor__label">{{property.getName()}}</span>
      <div class="vargin-property-editor__input url-editor__input">
        <span class="url-editor__input-value" [title]="getValue()">
          {{getValue()}}
        </span>
        <button type="button" (click)="changeURL()">...</button>
      </div>
    </label>`
})
class URLPropertyEditor {
  private property: IProperty<string>;
  private address: Address;

  constructor(@Inject(Property) property: IProperty<string>) {
    this.property = property;

    let urlString = this.property.getValue();
    this.address = urlString ? Address.deserialize(urlString) : new Address();
  }

  getValue() {
    if (!this.address.value) {
      return '[Not defined]';
    }

    if (this.address.type === AddressType.APP_PAGE) {
      let page = ApplicationService.current.pages.find(
        (page) => page.id === this.address.value
      );

      if (page) {
        return page.name;
      } else {
        this.reset();

        return '[Not defined]';
      }
    }

    return this.address.value;
  }

  changeURL() {
    DialogService.show(
      URLPropertyEditorDialog, [provide(Address, { useValue: this.address })]
    ).then(() => {
      if (this.address.value) {
        this.property.setValue(Address.serialize(this.address));
      } else {
       this.reset();
      }
    });
  }

  private reset() {
    this.property.setValue('');
    this.address = new Address();
  }
}

export default URLPropertyEditor;
