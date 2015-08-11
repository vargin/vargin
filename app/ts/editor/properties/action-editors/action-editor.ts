/// <reference path="../../../../../typings/tsd.d.ts" />
import { Component, Inject, NgFor, Optional, View } from 'angular2/angular2';
import { IAction } from 'core/actions/action';
import { IProperty, Property } from 'core/property';

import { ChangePropertyAction } from 'core/actions/change-property-action';

@Component({
  selector: 'vargin-action-editor',
  properties: ['property']
})
@View({
  template: `
    <section>
      <header>Actions for "{{ property.getName() }}"</header>
      <ul>
        <li *ng-for="#action of property.getValue()">
          {{ action.name }} : {{ action.type }}
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
export class ActionEditor {
  private property: IProperty<Array<IAction>>;
  private isDefaultSelected: boolean = true;

  constructor(
    @Optional() @Inject(Property) property?: IProperty<Array<IAction>>
  ) {
    this.property = property;
  }

  addNewAction(newActionSelect) {
    if (newActionSelect.value === 'default') {
      return;
    }

    this.property.getValue().push(
      new ChangePropertyAction(new Map([
        ['control-id', ''],
        ['property-name', ''],
        ['property-value', ''],
      ]))
    );

    newActionSelect.value = 'default';
  }
}