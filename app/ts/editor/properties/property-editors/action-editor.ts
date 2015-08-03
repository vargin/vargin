/// <reference path="../../../../../typings/tsd.d.ts" />
import { Component, Inject, NgFor, Optional, View } from 'angular2/angular2';
import { IAction } from 'core/actions/action';
import { IProperty, Property } from 'core/property';

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
      </ul>
    </section>
  `,
  directives: [NgFor]
})
export class ActionEditor {
  private property: IProperty<Array<IAction>>;

  constructor(
    @Optional() @Inject(Property) property?: IProperty<Array<IAction>>
  ) {
    this.property = property;
  }
}