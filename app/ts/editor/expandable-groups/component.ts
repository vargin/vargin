/// <reference path="../../../../typings/tsd.d.ts" />
import { Component, Inject, NgFor, View } from 'angular2/angular2';

import ControlService from 'services/control-service';

import BaseControl from 'core/controls/base-control';
import ControlGroup from 'core/controls/control-group';

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
  private _controlService: ControlService;
  groups: Array<IExpandableGroup>;

  constructor(@Inject(ControlService) controlService: ControlService) {
    this.groups = [{
      content: ControlGroup.get('visual'),
      expanded: true,
    }, {
      content: ControlGroup.get('service'),
      expanded: false
    }];

    this._controlService = controlService;
  }

  toggleGroupState(group) {
    group.expanded = !group.expanded;
  }

  onDragStart(e: DragEvent, control: BaseControl<any>) {
    e.dataTransfer.setData('text/plain', 'dummy');
    /*e.dataTransfer.effectAllowed = 'link';
    e.dataTransfer.dropEffect = 'link';*/

    this._controlService.dragControl(control.clone());
  }

  onDragEnd(e: DragEvent, control: BaseControl<any>) {

  }
}

export default ExpandableGroups;