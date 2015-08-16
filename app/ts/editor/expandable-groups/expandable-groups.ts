/// <reference path="../../../../typings/tsd.d.ts" />
import { Component, NgFor, View } from 'angular2/angular2';

interface IExpandableGroupItem {
  name: string;
  type: string;
}

export interface IExpandableGroup {
  name: string;
  expanded: boolean;
  items: IExpandableGroupItem[]
}

@Component({
  selector: 'expandable-groups',
  properties: ['groups']
})
@View({
  templateUrl: 'expandable-groups/expandable-groups.html',
  directives: [NgFor]
})
export class VarginExpandableGroups {
  groups: IExpandableGroup[] = [];

  toggleGroupState(group) {
    group.expanded = !group.expanded;
  }

  onDragStart(e: DragEvent, item: IExpandableGroupItem) {
    e.dataTransfer.setData('text/plain', item.type);
  }
}

export default VarginExpandableGroups;