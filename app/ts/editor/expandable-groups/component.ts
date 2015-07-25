/// <reference path="../../../../typings/tsd.d.ts" />
import { Component, Inject, NgFor, View } from 'angular2/angular2';

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
  templateUrl: 'editor/expandable-groups/component.html',
  directives: [NgFor]
})

class ExpandableGroups {
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

export default ExpandableGroups;