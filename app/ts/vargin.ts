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

/** Dynamic dependencies **/
import { ActionEditor } from 'editor/properties/action-editor';
import ButtonComponent from 'editor/control-components/visual/button-component';
import LabelComponent from 'editor/control-components/visual/label-component';
import LinkComponent from 'editor/control-components/visual/link-component';
import RangeComponent from 'editor/control-components/visual/range-component';
import TextInputComponent from 'editor/control-components/visual/text-input-component';
import DatasourceComponent from 'editor/control-components/service/datasource-component';

export const EDITORS_COMPONENTS = [
  ActionEditor
];

const VISUAL_COMPONENTS = [
  ButtonComponent,
  LabelComponent,
  LinkComponent,
  RangeComponent,
  TextInputComponent
];

const SERVICE_COMPONENTS = [
  DatasourceComponent
];
/** End of Dynamic dependencies **/

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
    ].map((controlGroup: ControlGroup) => {
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
    });
  }
}

bootstrap(Vargin);
