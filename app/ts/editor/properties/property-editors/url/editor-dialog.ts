/// <reference path="../../../../../../typings/tsd.d.ts" />
import { Component, Inject, NgFor, NgIf, View } from 'angular2/angular2';
import { IProperty, Property } from 'core/property';
import { ApplicationPage } from 'core/application-page';
import { ApplicationService } from 'services/application-service';

interface IAddress {
  type: string;
  value: string;
}

@Component({
  selector: 'url-property-editor-dialog'
})
@View({
  template: `
    <header class="url-editor-dialog__header">Choose Address</header>
    <select #type [value]="address.type"
            (change)="onTypeChange(type.value)">
      <option value="page">App Page</option>
      <option value="web-address">URL</option>
      <option value="mailto">E-Mail</option>
      <option value="tel">Telephone</option>
    </select>
    <input #value
           *ng-if="address.type !== 'page'"
           [type]="getEditorType()"
           (change)="onValueChange(value.value)"
           [value]="address.value" />
    <select #pagevalue
            *ng-if="address.type === 'page'"
            [value]="address.value"
            (change)="onValueChange(pagevalue.value)">
      <option *ng-for="#page of pages" [value]="page.id">
        {{page.name}}
      </option>
    </select>
  `,
  directives: [NgFor, NgIf]
})
export class URLPropertyEditorDialog {
  private property: IProperty<string>;
  private address: IAddress = { type: 'web-address', value: '' };
  private pages: ApplicationPage[] = [];

  constructor(@Inject(Property) property: IProperty<string>) {
    this.property = property;

    let urlString = property.getValue();
    if (urlString) {
      this.address = this.extractURLParts(urlString);
    }

    this.pages = ApplicationService.current.pages;
  }

  private onTypeChange(type: string) {
    this.address = {
      type,
      value: type === 'page' ? this.pages[0].id : ''
    };

    this.property.setValue(
      URLPropertyEditorDialog.joinURLParts(
        this.address.type, this.address.value
      )
    );
  }

  private onValueChange(value: string) {
    this.address.value = value;

    this.property.setValue(
      URLPropertyEditorDialog.joinURLParts(this.address.type, value)
    );
  }

  private getEditorType(): string {
    switch (this.address.type) {
      case 'web-address':
        return 'url';
      case 'mailto':
        return 'email';
      case 'tel':
        return 'tel';
      default:
        return 'text';
    }
  }

  private extractURLParts(urlString: string): IAddress {
    if (urlString.startsWith('mailto:') || urlString.startsWith('tel:') ||
        urlString.startsWith('page:')) {
      let urlParts = urlString.split(':');
      return {
        type: urlParts[0],
        value: urlParts[1]
      };
    }

    return {
      type: 'web-address',
      value: urlString
    };
  }

  private static joinURLParts(type: string, value: string): string {
    if (value && (type === 'mailto' || type === 'tel' || type === 'page')) {
      return type + ':' + value;
    }

    return value;
  }
}
