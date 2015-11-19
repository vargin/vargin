import { bootstrap, Component, Type, View } from 'angular2/angular2';

import {
  IExpandableGroup,
  VarginExpandableGroups
} from './expandable-groups/expandable-groups';
import VarginWorkspace from './workspace/workspace';
import VarginProperties from './properties/properties';
import { DialogManager } from './dialog-manager/dialog-manager';

import { ControlGroup } from '../../core/controls/control-group';

import { ControlService } from '../../core/services/control-service';

@Component({
  selector: 'vargin'
})
@View({
  template: `
    <article class="vargin-editor">
      <section class="vargin-editor__components">
        <expandable-groups [groups]="controlGroups" />
      </section>
      <section class="vargin-editor__workspace">
        <vargin-workspace />
      </section>
      <section class="vargin-editor__properties">
        <vargin-properties />
      </section>
    </article>
    <dialog-manager></dialog-manager>
  `,
  directives: [
    DialogManager, VarginExpandableGroups, VarginWorkspace, VarginProperties
  ]
})

class Vargin {
  private controlGroups: IExpandableGroup[];

  constructor() {
    this.controlGroups = [
      this.controlGroupToExpandableGroup(
        ControlGroup.register(
          'visual',
          'Visual',
          'Visual components',
          [
            ControlService.getMetadata('label'),
            ControlService.getMetadata('link'),
            ControlService.getMetadata('list'),
            ControlService.getMetadata('button'),
            ControlService.getMetadata('container'),
            ControlService.getMetadata('range'),
            ControlService.getMetadata('text-input')
          ]
        )
      ),
      this.controlGroupToExpandableGroup(
        ControlGroup.register(
          'service',
          'Service',
          'Service components',
          [ControlService.getMetadata('datasource')]
        )
      )
    ];
  }

  private controlGroupToExpandableGroup(controlGroup: ControlGroup) {
    return {
      name: controlGroup.name,
      type: controlGroup.type,
      expanded: false,
      items: controlGroup.items.map((control) => {
        return {
          name: control.name,
          type: control.type
        };
      })
    };
  }
}
bootstrap(Vargin);
