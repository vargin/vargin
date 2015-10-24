/// <reference path="../../typings/tsd.d.ts" />
import { bootstrap, Component, Type, View } from 'angular2/angular2';

import {
  IExpandableGroup,
  VarginExpandableGroups
} from 'editor/expandable-groups/expandable-groups';
import VarginWorkspace from 'editor/workspace/workspace';
import VarginProperties from 'editor/properties/properties';
import { DialogManager } from 'editor/dialog-manager/dialog-manager';

import { ControlGroup } from 'core/controls/control-group';

import { ControlService } from 'services/control-service';

import { REGISTRY as VISUAL_CONTROLS } from 'core/controls/visual/_registry';
import { REGISTRY as SERVICE_CONTROLS } from 'core/controls/service/_registry';
import { REGISTRY as EDITOR_COMPONENTS } from 'editor/_registry';

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
  private dependencies: Type[] = [
    ...VISUAL_CONTROLS,
    ...SERVICE_CONTROLS,
    ...EDITOR_COMPONENTS
  ];
  private controlGroups: IExpandableGroup[] = [];

  constructor() {
    Promise.all([
      ControlService.getMetadata('label'),
      ControlService.getMetadata('link'),
      ControlService.getMetadata('list'),
      ControlService.getMetadata('button'),
      ControlService.getMetadata('container'),
      ControlService.getMetadata('range'),
      ControlService.getMetadata('text-input')
    ]).then((controlsMetadata) => {
      this.controlGroups.push(
        this.controlGroupToExpandableGroup(
          ControlGroup.register(
            'visual',
            'Visual',
            'Visual components',
            controlsMetadata
          )
        )
      );
    });

    Promise.all([
      ControlService.getMetadata('datasource')
    ]).then((controlsMetadata) => {
      this.controlGroups.push(
        this.controlGroupToExpandableGroup(
          ControlGroup.register(
            'service',
            'Service',
            'Service components',
            controlsMetadata
          )
        )
      );
    });
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
