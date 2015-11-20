import {
  Component, Inject, NgFor, provide, Type, View
} from 'angular2/angular2';
import { DialogService } from '../../../services/dialog-service';
import { IAction, Action } from '../../../../../core/actions/action';
import { PropertyEditorDialog } from './editor-dialog';

@Component({
  selector: 'event-property-list-dialog'
})
@View({
  template: `
    <header class="items-list-dialog__header">Edit Actions</header>
    <table class="vargin-table">
      <tfoot>
        <tr class="vargin-table__footer-row">
          <td><button (click)="add()">+ Add action</button></td>
        </tr>
      </tfoot>
      <tbody>
        <tr class="vargin-table__data-row" *ng-for="#action of actions; #i = index">
          <td class="vargin-table__data-cell" (click)="edit(action)">
            {{ action.meta.name }}
          </td>
          <td class="vargin-table__data-cell">
            <button class="vargin-list__remove-item" (click)="remove(i)">
              &#x274c;
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  `,
  directives: [NgFor]
})
export class PropertyListDialog {
  private actions: IAction[];

  constructor(@Inject(Array) actions: IAction[]) {
    this.actions = actions;
  }

  add() {
    DialogService.show(PropertyEditorDialog).then((action?: IAction) => {
      if (action) {
        this.actions.push(action);
      }
    });
  }

  edit(action: IAction) {
    DialogService.show(
      PropertyEditorDialog, [provide(Action, { useValue: action })]
    );
  }

  remove(index: number) {
    this.actions.splice(index, 1);
  }
}
