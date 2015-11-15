import {
  Component, Inject, NgFor, Optional, View
} from 'angular2/angular2';
import { IProperty } from '../../../../../core/property';
import { IAction, Action } from '../../../../../core/actions/action';
import { ActionService } from '../../../../../core/services/action-service';
import PropertyEditor from '../property-editor';

@Component({
  selector: 'event-property-editor-dialog'
})
@View({
  template: `
    <header class="items-editor-dialog__header">Setup action</header>
    <select #newaction (change)="typeChanged(newaction.value)" [value]="actionType">
      <option value="default">(+ Choose action type)</option>
      <option value="alert-action">Alert</option>
      <option value="change-property-action">Change property</option>
      <option value="navigate-action">Navigate</option>
    </select>
    <ul class="vargin-list">
      <li class="vargin-list__item" *ng-for="#property of actionProperties">
        <property-editor [property]="property"></property-editor>
      </li>
    </ul>
    <button class="items-editor-dialog__save" (click)="dispose(action)">Save</button>
  `,
  directives: [NgFor, PropertyEditor]
})
export class EventPropertyEditorDialog {
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
