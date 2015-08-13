/// <reference path="../../../../typings/tsd.d.ts" />
import {
  Component,
  Inject,
  LifecycleEvent,
  NgFor,
  Optional,
  View
} from 'angular2/angular2';
import { Action } from 'core/actions/action';
import { IProperty, Property } from 'core/property';
import PropertyEditor from 'editor/properties/property-editors/property-editor';

@Component({
  selector: 'vargin-action-editor',
  properties: ['action'],
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
  private action: Action;
  private actionProperties: Array<IProperty<string>> = [];

  constructor(@Optional() @Inject(Action) action?: Action) {
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
}