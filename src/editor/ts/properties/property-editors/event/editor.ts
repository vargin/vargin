import { Component, Inject, provide, View } from 'angular2/angular2';

import { IProperty, Property } from '../../../../../core/property';
import { IAction } from '../../../../../core/actions/action';

import * as JSONAction from '../../../../../compilers/json/json-action-compiler';
import { DialogService } from '../../../services/dialog-service';
import { EventPropertyListDialog } from './list-dialog';

@Component({
  selector: 'event-property-editor',
  properties: ['property']
})
@View({
  template: `
    <label class="vargin-property-editor">
      <span class="vargin-property-editor__label">{{property.getName()}}</span>
      <div class="vargin-property-editor__input event-editor__input">
        <span class="event-editor__input-value">{{getValue()}}</span>
        <button type="button" (click)="change()">...</button>
      </div>
    </label>`
})
export class EventPropertyEditor {
  private property: IProperty<string>;
  private actions: IAction[] = [];
  private actionCompiler = new JSONAction.JSONActionCompiler();

  constructor(@Inject(Property) property: IProperty<string>) {
    this.property = property;

    let propertyValue = this.property.getValue();
    if (propertyValue) {
      Promise.all(
        (<JSONAction.IJSONAction[]>JSON.parse(propertyValue)).map((action) => {
          return this.actionCompiler.decompile(action);
        })
      ).then((actions) => {
        this.actions = actions;
      });
    }
  }

  getValue() {
    let numberOfActions = this.actions.length;
    return numberOfActions ? `[${numberOfActions} actions]` : '[Not handled]';
  }

  change() {
    DialogService.show(
      EventPropertyListDialog,
      [provide(Array, { useValue: this.actions })]
    ).then(() => {
      if (this.actions.length) {
        Promise.all(
          this.actions.map((action) => {
            return this.actionCompiler.compile(action);
          })
        ).then((actions: JSONAction.IJSONAction[]) => {
          this.property.setValue(JSON.stringify(actions));
        });
      } else {
        this.property.setValue('');
      }
    });
  }
}
