/// <reference path="../../typings/tsd.d.ts" />
import { bootstrap, Component, View } from 'angular2/angular2';

import {
  IExpandableGroup,
  VarginExpandableGroups
} from 'editor/expandable-groups/expandable-groups';
import VarginWorkspace from 'editor/workspace/workspace';
import VarginProperties from 'editor/properties/properties';

import { ControlGroup } from 'core/controls/control-group';

import { ControlService } from 'services/control-service';

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
  `,
  directives: [VarginExpandableGroups, VarginWorkspace, VarginProperties]
})

class Vargin {
  private controlGroups: IExpandableGroup[];

  constructor() {
    this.controlGroups = [
      ControlGroup.register(
        'visual',
        'Visual',
        'Visual components',
        [
          ControlService.getMetadata('label'),
          ControlService.getMetadata('link'),
          ControlService.getMetadata('button'),
          ControlService.getMetadata('container'),
          ControlService.getMetadata('range'),
          ControlService.getMetadata('text-input')
        ]
      ),

      ControlGroup.register(
        'service',
        'Service',
        'Service components',
        [ControlService.getMetadata('datasource')]
      )
    ].map((controlGroup) => {
      return {
        name: controlGroup.name,
        expanded: false,
        items: controlGroup.items.map((control) => {
          return {
            name: control.name,
            type: control.type
          };
        })
      };
    });
  }
}

bootstrap(Vargin);
