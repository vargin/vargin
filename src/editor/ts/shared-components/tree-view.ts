import {
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  Output,
  ViewQuery,
  QueryList,
  Type,
  View
} from 'angular2/angular2';

import { EditableLabel } from './editable-label';

export interface ITreeViewItem<TData> {
  name: string;
  selected: boolean;
  parent: ITreeViewItem<TData>;
  children: ITreeViewItem<TData>[];
  data: TData;
}

@Component({
  selector: 'tree-view'
})
@View({
  template: `
    <ul class="tree-view-list">
        <li class="tree-view-list__item"
            [class.tree-view-list__item--selected]="item.selected"
          *ng-for="#item of items"
          (click)="onItemClicked($event, item)">
        <vargin-editable-label class="tree-view-list__item-label"
          [value]="item.name"
          [allow-editing]="editable"
          (value-change)="onItemNameChange(item, $event)">
        </vargin-editable-label>
        <tree-view [items]="item.children" [editable]="editable"
                   (item-name-changed)="propagateItemNameChanged($event)"
                   (item-selected)="propagateItemSelected($event)">
        </tree-view>
      </li>
    </ul>
  `,
  directives: [EditableLabel, TreeView]
})
export class TreeView<TData> {
  @Input() items: ITreeViewItem<TData>[];
  @Input() editable: boolean = false;
  @Output() itemSelected = new EventEmitter<ITreeViewItem<TData>>();
  @Output() itemNameChanged = new EventEmitter<ITreeViewItem<TData>>();

  parent: TreeView<TData>;

  constructor(@Inject(QueryList) @ViewQuery(TreeView) children: QueryList<TreeView<TData>>) {
    children.changes.subscribe(() => {
      children.toArray().forEach(
        (child: TreeView<TData>) => child.parent = this
      );
    });
  }

  private onItemClicked(e: MouseEvent, item: ITreeViewItem<TData>) {
    e.stopPropagation();

    // Don't do anything if this item is already selected.
    if (item.selected) {
      return;
    }

    this.selectItem(this.getRoot().items, item);

    this.propagateItemSelected(item);
  }

  private onItemNameChange(item, newName) {
    item.name = newName;

    this.propagateItemNameChanged(item);
  }

  private propagateItemSelected(item: ITreeViewItem<TData>) {
    this.itemSelected.next(item);
  }

  private propagateItemNameChanged(item: ITreeViewItem<TData>) {
    this.itemNameChanged.next(item);
  }

  /**
   * Returns root of the tree.
   * @returns {TreeView<TData>}
   * @private
   */
  private getRoot() {
    let root = this;

    while (root.parent) {
      root = root.parent;
    }

    return root;
  }

  private selectItem(
    items: ITreeViewItem<TData>[], itemToSelect: ITreeViewItem<TData>
  ) {
    items.forEach((item: ITreeViewItem<TData>) => {
      item.selected = item === itemToSelect;

      if (item.children.length) {
        this.selectItem(item.children, itemToSelect);
      }
    });
  }
}
