import { Component, Inject, Optional, View } from 'angular2/core';

import { IProperty, Property } from '../../../../core/property';

@Component({
  selector: 'image-property-editor',
  properties: ['property']
})
@View({
  template: `
    <label class="vargin-property-editor">
      <span class="vargin-property-editor__label">{{property.getName()}}</span>
      <input #picker type="file" accept="image/*"
             (change)="onChange($event.target.files[0])"/>
      <button class="vargin-property-editor__input"
              (click)="picker.click()">
        Browse...
      </button>
    </label>`
})
export class PropertyEditor {
  private property: IProperty<string>;

  constructor(@Inject(Property) property: IProperty<string>) {
    this.property = property;
  }

  onChange(value: Blob) {
    let reader = new FileReader();
    reader.onloadend = () => this.property.setValue(`url(${reader.result})`);
    reader.readAsDataURL(value);
  }
}
