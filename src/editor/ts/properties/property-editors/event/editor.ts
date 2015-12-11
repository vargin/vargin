import { Component, Inject, provide, View } from 'angular2/core';

import { IProperty, Property } from '../../../../../core/property';
import { IAction } from '../../../../../core/actions/action';

import * as JSONAction from '../../../../../compilers/json/json-action-compiler';
import { DialogService } from '../../../services/dialog-service';
import { PropertyListDialog } from './list-dialog';

@Component({
  selector: 'event-property-editor',
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
  private property: IProperty<string>;
  private actionCompiler = new JSONAction.JSONActionCompiler();

  constructor(@Inject(Property) property: IProperty<string>) {
    this.property = property;
  }

  getValue() {
    return this.property.getValue() ? '[Handled]' : '[Not handled]';
  }

  change() {
    this.deserialize().then((actions) => {
      return DialogService.show(
        PropertyListDialog, [provide(Array, { useValue: actions })]
      ).then(() => {
        if (actions.length) {
          Promise.all(
            actions.map((action) => this.actionCompiler.compile(action))
          ).then((actions: JSONAction.IJSONAction[]) => {
            this.property.setValue(JSON.stringify(actions));
          });
        } else {
          this.property.setValue('');
        }
      });
    });
  }

  private deserialize(): Promise<IAction[]> {
    let propertyValue = this.property.getValue();

    if (propertyValue) {
      return Promise.all(
        (<JSONAction.IJSONAction[]>JSON.parse(propertyValue)).map((action) => {
          return this.actionCompiler.decompile(action);
        })
      );
    }

    return Promise.resolve([]);
  }
}
