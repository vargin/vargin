/// <reference path="../../../../typings/tsd.d.ts" />
import { Component, Inject, NgFor, View } from 'angular2/angular2';
import { IAction, Action } from 'core/actions/action';
import { IProperty } from 'core/property';
import PropertyEditor from 'editor/ts/properties/property-editors/property-editor';

@Component({
  selector: 'vargin-action-editor'
})
@View({
  template: `
    <header>Setup action</header>
    <ul class="vargin-action-editor__properties">
      <li class="vargin-action-editor__property"
          *ng-for="#property of actionProperties">
        <property-editor [property]="property"></property-editor>
      </li>
    </ul>
  `,
  directives: [NgFor, PropertyEditor]
})
export class ActionEditor {
  private action: IAction;
  private actionProperties: IProperty<string>[] = [];

  constructor(@Inject(Action) action: IAction) {
    this.action = action;

    this.action.properties.forEach((property) => {
      this.actionProperties.push(property);
    });
  }
}
