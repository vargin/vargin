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
  lifecycle: [LifecycleEvent.onChange],
  host: {
    '(click)': 'close()'
  }
})
@View({
  template: `
    <section class="vargin-action-editor__content">
      <header>Setup action</header>
      <ul class="vargin-action-editor__properties">
        <li class="vargin-action-editor__property"
            *ng-for="#property of actionProperties">
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
  private close: Function;

  constructor(@Inject(Action) action: IAction, @Inject(Function) close) {
    this.action = action;
    this.close = close;

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