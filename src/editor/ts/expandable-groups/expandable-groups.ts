import { Component, NgFor, View } from 'angular2/angular2';

interface IExpandableGroupItem {
  name: string;
  type: string;
}

export interface IExpandableGroup {
  name: string;
  type: string;
  expanded: boolean;
  items: IExpandableGroupItem[];
}

@Component({
  selector: 'expandable-groups',
  properties: ['groups']
})
@View({
  templateUrl: 'ts/expandable-groups/expandable-groups.html',
  directives: [NgFor]
})
export class VarginExpandableGroups {
  groups: IExpandableGroup[] = [];

  toggleGroupState(group: IExpandableGroup) {
    group.expanded = !group.expanded;
  }

  onDragStart(
    e: DragEvent,
    group: IExpandableGroup,
    item: IExpandableGroupItem
  ) {
    e.dataTransfer.setData(`text/${group.type}`, item.type);
  }
}

export default VarginExpandableGroups;
