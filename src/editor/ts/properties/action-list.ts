/// <reference path="../../../../typings/tsd.d.ts" />
import {
  Component,
  Inject,
  NgFor,
  provide,
  Type,
  View
} from 'angular2/angular2';
import { IAction, Action } from 'core/actions/action';
import { IProperty, Property } from 'core/property';

import { ActionService } from 'core/services/action-service';

import { AlertAction } from 'core/actions/alert-action';
import { ChangePropertyAction } from 'core/actions/change-property-action';
import { NavigateAction } from 'core/actions/navigate-action';
import { DialogService } from 'editor/ts/services/dialog-service';

@Component({
  selector: 'vargin-action-list'
})
@View({
  template: `
    <ul class="vargin-list vargin-action-list" #actioneditor>
      <li class="vargin-list__item"
          *ng-for="#action of property.getValue()">
        <span (click)="editAction(action)">{{ action.name }}</span>
        <button class="vargin-list__remove-item"
                (click)="removeAction(action)">
          &#x274c;
        </button>
      </li>
      <li class="vargin-list__item">
        <select #newaction (change)="addNewAction(newaction)">
          <option value="default" selected="{{isDefaultSelected}}">
            (+ Choose new action)
          </option>
          <option value="alert-action">Alert</option>
          <option value="change-property-action">Change property</option>
          <option value="navigate-action">Navigate</option>
        </select>
      </li>
    </ul>
  `,
  directives: [NgFor]
})
export class ActionList {
  private property: IProperty<Array<IAction>>;
  private isDefaultSelected: boolean = true;

  constructor(@Inject(Property) property: IProperty<Array<IAction>>) {
    this.property = property;
  }

  addNewAction(newActionSelect: HTMLSelectElement) {
    let actions = this.property.getValue();

    if (!actions) {
      actions = [];
      this.property.setValue(actions);
    }

    switch (newActionSelect.value) {
      case 'alert-action':
        actions.push(new AlertAction());
        break;
      case 'change-property-action':
        actions.push(new ChangePropertyAction());
        break;
      case 'navigate-action':
        actions.push(new NavigateAction());
        break;
      case 'default':
        return;
      default:
        throw new Error('Unsupported action ' + newActionSelect.value);
    }

    newActionSelect.value = 'default';
  }

  editAction(action: IAction) {
    System.import('editor/ts/properties/action-editor').then((module: any) => {
      DialogService.show(
        <Type>module.ActionEditor, [provide(Action, { useValue: action })]
      );
    });
  }

  removeAction(action: IAction) {
    let propertyActions = this.property.getValue();
    propertyActions.splice(propertyActions.indexOf(action), 1);
  }
}
