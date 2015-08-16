/// <reference path="../../../../typings/tsd.d.ts" />
import {
  Component,
  Inject,
  NgFor,
  View
} from 'angular2/angular2';
import { IAction } from 'core/actions/action';
import { IProperty, Property } from 'core/property';

import { ActionService } from 'services/action-service';

import { ChangePropertyAction } from 'core/actions/change-property-action';

@Component({
  selector: 'vargin-action-list'
})
@View({
  template: `
    <section>
      <header>Actions for "{{ property.getName() }}"</header>
      <ul #actioneditor>
        <li *ng-for="#action of property.getValue()">
          {{ action.name }} <button (click)="editAction(action)">Edit</button>
        </li>
        <li>
          <select #newaction (change)="addNewAction(newaction)">
            <option value="default" selected="{{isDefaultSelected}}">
              (+ Choose new action)
            </option>
            <option value="change-property-action">Change property</option>
          </select>
        </li>
      </ul>
    </section>
  `,
  directives: [NgFor]
})
export class ActionList {
  private property: IProperty<Array<IAction>>;
  private isDefaultSelected: boolean = true;

  constructor(@Inject(Property) property: IProperty<Array<IAction>>) {
    this.property = property;
  }

  addNewAction(newActionSelect) {
    switch (newActionSelect.value) {
      case 'change-property-action':
        this.property.getValue().push(
          new ChangePropertyAction()
        );
        break;
      case 'default':
        return;
      default:
        throw new Error('Unsupported action ' + newActionSelect.value);
    }

    newActionSelect.value = 'default';
  }

  editAction(action: IAction) {
    ActionService.selectAction(action);
  }
}