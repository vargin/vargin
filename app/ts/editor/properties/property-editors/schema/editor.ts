/// <reference path="../../../../../../typings/tsd.d.ts" />
import { bind, Component, Inject, Injector, View } from 'angular2/angular2';

import { IProperty, Property } from 'core/property';
import { DialogService } from 'services/dialog-service';
import { SchemaPropertyEditorDialog } from 'editor/properties/property-editors/schema/editor-dialog';
import { ApplicationService } from 'services/application-service';

@Component({
  selector: 'schema-property-editor',
  properties: ['property']
})
@View({
  template: `
    <label class="vargin-property-editor">
      <span class="vargin-property-editor__label">{{property.getName()}}</span>
      <div class="vargin-property-editor__input schema-editor__input">
        <span class="schema-editor__input-value">
          {{getSchema()}}
        </span>
        <button type="button" (click)="changeSchema()">...</button>
      </div>
    </label>`
})
export class SchemaPropertyEditor {
  private property: IProperty<string>;

  constructor(@Inject(Property) property: IProperty<string>) {
    this.property = property;
  }

  getSchema() {
    return this.property.getValue() ? '[Defined]' : '[Not defined]';
  }

  changeSchema() {
    DialogService.show({
      component: SchemaPropertyEditorDialog,
      bindings: Injector.resolve([bind(Property).toValue(this.property)])
    });
  }
}
