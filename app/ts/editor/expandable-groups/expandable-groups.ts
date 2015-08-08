/// <reference path="../../../../typings/tsd.d.ts" />
import { Component, NgFor, View } from 'angular2/angular2';

import { ControlMetadata } from 'core/controls/control-metadata';
import { ControlGroup } from 'core/controls/control-group';

interface IExpandableGroup {
  content: ControlGroup;
  expanded: boolean;
}

@Component({
  selector: 'expandable-groups'
})
@View({
  templateUrl: 'expandable-groups/expandable-groups.html',
  directives: [NgFor]
})
class VarginExpandableGroups {
  groups: Array<IExpandableGroup>;

  constructor() {
    this.groups = [{
      content: ControlGroup.get('visual'),
      expanded: true,
    }, {
      content: ControlGroup.get('service'),
      expanded: false
    }];
  }

  toggleGroupState(group) {
    group.expanded = !group.expanded;
  }

  onDragStart(e: DragEvent, controlMetadata: ControlMetadata) {
    e.dataTransfer.setData('text/plain', controlMetadata.type);
  }
}

export default VarginExpandableGroups;