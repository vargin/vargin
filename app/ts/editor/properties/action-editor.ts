/// <reference path="../../../../typings/tsd.d.ts" />
import {
  Component,
  Inject,
  LifecycleEvent,
  NgFor,
  View
} from 'angular2/angular2';
import { IAction, Action } from 'core/actions/action';
import { IProperty, Property } from 'core/property';
import PropertyEditor from 'editor/properties/property-editors/property-editor';

@Component({
  selector: 'vargin-action-editor',
  lifecycle: [LifecycleEvent.onChange]
})
@View({
  template: `
    <section>
      <header>Change action properties</header>
      <ul>
        <li *ng-for="#property of actionProperties">
          <property-editor [property]="property"></property-editor>
        </li>
      </ul>
    </section>
  `,
  directives: [NgFor, PropertyEditor]
})
export class ActionEditor {
  private action: IAction;
  private actionProperties: Array<IProperty<string>> = [];

  constructor(@Inject(Action) action: IAction) {
    this.action = action;

    this.action.properties.forEach((property) => {
      this.actionProperties.push(property);
    });
  }

  onChange() {
    this.actionProperties = [];

    if (this.action) {
      this.action.properties.forEach((property) => {
        this.actionProperties.push(property);
      });
    }
  }

  setAction(action: IAction) {
    this.action = action;

    this.onChange();
  }
}