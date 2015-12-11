import { Component, Inject, View } from 'angular2/core';
import { NgFor } from 'angular2/common';
import { Application } from '../../../../core/application';
import { IProperty, Property } from '../../../../core/property';
import { Control } from '../../../../core/controls/control';
import { DatasourceControl } from '../../../../core/controls/service/datasource-control';

@Component({
  selector: 'datasource-property-editor',
  properties: ['property']
})
@View({
  template: `
    <label class="vargin-property-editor">
      <span class="vargin-property-editor__label">{{property.getName()}}</span>
      <select class="vargin-property-editor__input"
              (change)="onChange($event.target.value)">
        <option>[Not Defined]</option>
        <option
          *ngFor="#datasource of getDatasources()"
          [value]="datasource.id"
          [selected]="property.getValue() === datasource.id">
          {{ datasource.getProperty('name').getValue() }}
          </option>
      </select>
    </label>
  `,
  directives: [NgFor]
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

  onChange(value: string) {
    this.property.setValue(value);
  }

  private getDatasources(): DatasourceControl[] {
    return this.application.serviceRoot.getChildren().reduce(
      (datasources: DatasourceControl[], control: Control) => {
        if (control.meta.type === 'datasource') {
          datasources.push(<DatasourceControl>control);
        }

        return datasources;
      }, []);
  }
}
