import { Component, Inject, NgFor, NgIf, View } from 'angular2/angular2';
import { IProperty, Property } from '../../../../../core/property';
import { Address, AddressType } from '../../../../../core/data/address';
import { ApplicationPage } from '../../../../../core/application-page';
import { ApplicationService } from '../../../../../core/services/application-service';

@Component({
  selector: 'url-property-editor-dialog'
})
@View({
  template: `
    <header class="property-editor-dialog__header">Choose Address</header>
    <select #type [value]="address.type"
            (change)="onTypeChange(type.value)">
      <option value="0">URL</option>
      <option value="1">App Page</option>
      <option value="2">E-Mail</option>
      <option value="3">Telephone</option>
    </select>
    <input #value
           *ng-if="!isPageAddress()"
           [type]="getEditorType()"
           (change)="onValueChange(value.value)"
           [value]="address.value" />
    <select #pagevalue
            *ng-if="isPageAddress()"
            (change)="onValueChange(pagevalue.value)">
      <option *ng-for="#page of pages" [value]="page.id" [selected]="address.value === page.id">
        {{page.name}}
      </option>
    </select>
  `,
  directives: [NgFor, NgIf]
})
export class PropertyEditorDialog {
  private address: Address;
  private pages: ApplicationPage[] = [];

  constructor(@Inject(Address) address: Address) {
    this.address = address;

    this.pages = ApplicationService.current.pages;
  }

  private onTypeChange(type: string) {
    let addressType = <AddressType>+type;

    this.address.type = addressType;
    this.address.value = addressType === AddressType.APP_PAGE ?
      this.pages[0].id : '';
  }

  private onValueChange(value: string) {
    this.address.value = value;
  }

  private isPageAddress() {
    return this.address.type === AddressType.APP_PAGE;
  }

  private getEditorType(): string {
    switch (this.address.type) {
      case AddressType.URL:
        return 'url';
      case AddressType.EMAIL:
        return 'email';
      case AddressType.PHONE:
        return 'tel';
      default:
        return 'text';
    }
  }
}
