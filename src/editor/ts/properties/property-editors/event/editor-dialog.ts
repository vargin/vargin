import { Component, Inject, Optional, View } from 'angular2/core';
import { NgFor } from 'angular2/common';
import { IProperty } from '../../../../../core/property';
import { IAction, Action } from '../../../../../core/actions/action';
import { ActionService } from '../../../../../core/services/action-service';
import { PropertyEditor } from '../property-editor';

@Component({
  selector: 'event-property-editor-dialog'
})
@View({
  template: `
    <header class="property-editor-dialog__header">Setup action</header>
    <ul class="vargin-list">
      <li class="vargin-list__item">
        <label class="vargin-property-editor">
          <span class="vargin-property-editor__label">Type</span>
          <select #newaction class="vargin-property-editor__input"
                  (change)="typeChanged(newaction.value)"
                  [value]="actionType">
            <option value="default">Choose ...</option>
            <option value="alert-action">Alert</option>
            <option value="change-property-action">Change property</option>
            <option value="change-own-overrides-action">Change own state</option>
            <option value="change-overrides-action">Change state</option>
            <option value="navigate-action">Navigate</option>
          </select>
        </label>
      </li>
      <li class="vargin-list__item" *ngFor="#property of actionProperties">
        <property-editor [property]="property"></property-editor>
      </li>
    </ul>
    <button class="property-editor-dialog__save-button" (click)="dispose(action)">Save</button>
  `,
  directives: [NgFor, PropertyEditor]
})
export class PropertyEditorDialog {
  private action: IAction;
  private actionProperties: IProperty<string>[] = [];
  private actionType: string;
  private dispose: Function;

  constructor(
    @Inject('dispose') dispose: Function,
    @Optional() @Inject(Action) action?: IAction
  ) {
    this.dispose = dispose;
    this.action = action;

    this.actualizeAction();
  }

  private typeChanged(actionType: string) {
    if (actionType !== 'default') {
      this.action = ActionService.createByType(actionType);
    } else {
      this.action = null;
    }

    this.actualizeAction();
  }

  private actualizeAction() {
    this.actionProperties = [];

    if (this.action) {
      this.actionType = this.action.meta.type;

      this.action.meta.properties.forEach((property, key) => {
        this.actionProperties.push(this.action.getProperty(key));
      });
    } else {
      this.actionType = 'default';
    }
  }
}
