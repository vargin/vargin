import { Component, Inject, NgFor, provide, View } from 'angular2/angular2';
import { DialogService } from '../../../services/dialog-service';
import { UtilsService } from '../../../../../core/services/utils-service';
import { Control } from '../../../../../core/controls/control';
import { IOverrides, Overrides } from '../../../../../core/overrides/overrides';

import { ITreeViewItem, TreeView } from '../../../shared-components/tree-view';

@Component({
  selector: 'control-overrides-tree-dialog'
})
@View({
  template: `
    <header class="property-list-dialog__header">Control states</header>
    <tree-view [items]="tree"
               [editable]="true"
               (item-selected)="onItemSelected($event)"
               (item-name-changed)="onItemNameChanged($event)" >
    </tree-view>
    <section class="control-overrides-manage-buttons">
      <button (click)="add()">Add child state</button>
      <button (click)="remove()">Remove state</button>
    </section>
  `,
  directives: [NgFor, TreeView]
})
export class PropertyTreeDialog {
  private control: Control;
  private tree: ITreeViewItem<IOverrides>[];

  constructor(@Inject(Control) control: Control) {
    this.control = control;
    this.tree = [
      this.overridesToTreeViewItem(this.control.overrides.getRoot())
    ];
  }

  private add() {
    this.control.overrides.add(
      new Overrides(`${this.control.overrides.name}-child`)
    );

    this.tree = [
      this.overridesToTreeViewItem(this.control.overrides.getRoot())
    ];
  }

  private remove() {
    if (!this.control.overrides.parent) {
      return;
    }

    let overridesToRemove = this.control.overrides;
    this.control.overrides = overridesToRemove.parent;
    this.control.overrides.remove(overridesToRemove);

    this.tree = [
      this.overridesToTreeViewItem(this.control.overrides.getRoot())
    ];
  }

  private onItemSelected(item: ITreeViewItem<IOverrides>) {
    this.control.overrides = item.data;
  }

  private onItemNameChanged(item: ITreeViewItem<IOverrides>) {
    item.data.name = item.name;
  }

  private overridesToTreeViewItem(
    overrides: IOverrides,
    parent?: ITreeViewItem<IOverrides>
  ): ITreeViewItem<IOverrides> {
    let treeViewItem = <ITreeViewItem<IOverrides>>{
      name: overrides.name,
      selected: overrides === this.control.overrides,
      parent: parent,
      children: [],
      data: overrides
    };

    overrides.children.forEach((child) => {
      treeViewItem.children.push(
        this.overridesToTreeViewItem(child, treeViewItem)
      );
    });

    return treeViewItem;
  }
}
