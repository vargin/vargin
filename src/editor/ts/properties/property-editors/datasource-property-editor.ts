import { Component, Inject, NgFor, View } from 'angular2/angular2';

import { IProperty, Property } from '../../../../core/property';
import { Control } from '../../../../core/controls/control';
import { DatasourceControl } from '../../../../core/controls/service/datasource-control';

import { ApplicationService } from '../../../../core/services/application-service';

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
          *ng-for="#datasource of getDatasources()"
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

  constructor(@Inject(Property) property: IProperty<string>) {
    this.property = property;
  }

  onChange(value: string) {
    this.property.setValue(value);
  }

  private getDatasources(): DatasourceControl[] {
    return ApplicationService.current.serviceRoot.getChildren().reduce(
      (datasources: DatasourceControl[], control: Control) => {
        if (control.meta.type === 'datasource') {
          datasources.push(<DatasourceControl>control);
        }

        return datasources;
      }, []);
  }
}
