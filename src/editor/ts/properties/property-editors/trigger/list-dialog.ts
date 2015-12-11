import { Component, Inject, provide, View } from 'angular2/core';
import { NgFor } from 'angular2/common';
import { DialogService } from '../../../services/dialog-service';
import { IAction, Action } from '../../../../../core/actions/action';
import { Trigger } from '../../../../../core/triggers/trigger';
import { PropertyEditorDialog } from '../event/editor-dialog';

export interface IDialogResult {
  remove?: boolean;
}

@Component({
  selector: 'trigger-property-list-dialog'
})
@View({
  template: `
    <header class="property-list-dialog__header">Edit Trigger</header>
    <ul class="vargin-list">
      <li class="vargin-list__item">
        <label class="vargin-property-editor">
          <span class="vargin-property-editor__label">Name</span>
          <input #name class="vargin-property-editor__input" type="text"
                 [value]="trigger.name" (keyup)="onNameChange(name.value)" />
        </label>
      </li>
      <li class="vargin-list__item">
        <label class="vargin-property-editor">
          <span class="vargin-property-editor__label">Condition</span>
          <input #condition class="vargin-property-editor__input" type="text"
                 [value]="trigger.condition"
                 (keyup)="onConditionChange(condition.value)" />
        </label>
      </li>
    </ul>
    <table class="vargin-table">
      <tbody>
        <tr class="vargin-table__data-row" *ngFor="#action of trigger.actions; #i = index">
          <td class="vargin-table__data-cell" (click)="editAction(action)">
            {{ action.meta.name }}
          </td>
          <td class="vargin-table__data-cell">
            <button class="vargin-list__remove-item" (click)="removeAction(i)">
              &#x274c;
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <button class="vargin-button-link" (click)="addAction()">+ Add action</button>
    <br />
    <button class="vargin-button-link remove-trigger-button"
            (click)="remove()">Remove trigger</button>
  `,
  directives: [NgFor]
})
export class PropertyListDialog {
  private trigger: Trigger;
  private dispose: (dialogResult: IDialogResult) => void;

  constructor(
    @Inject(Trigger) trigger: Trigger,
    @Inject('dispose') dispose: (dialogResult: IDialogResult) => void
  ) {
    this.trigger = trigger;
    this.dispose = dispose;
  }

  addAction() {
    DialogService.show(PropertyEditorDialog).then((action?: IAction) => {
      if (action) {
        this.trigger.actions.push(action);
      }
    });
  }

  editAction(action: IAction) {
    DialogService.show(
      PropertyEditorDialog, [provide(Action, { useValue: action })]
    );
  }

  removeAction(index: number) {
    this.trigger.actions.splice(index, 1);
  }

  remove() {
    this.dispose({ remove: true });
  }

  private onNameChange(newName: string) {
    this.trigger.name = newName;
  }

  private onConditionChange(newCondition: string) {
    this.trigger.condition = newCondition;
  }
}
