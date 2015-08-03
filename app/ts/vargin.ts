/// <reference path="../../typings/tsd.d.ts" />
import { bootstrap, Component, View } from 'angular2/angular2';

import ExpandableGroups from 'editor/expandable-groups/expandable-groups';
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
        <expandable-groups />
      </section>
      <section class="vargin-editor__workspace">
        <vargin-workspace />
      </section>
      <section class="vargin-editor__properties">
        <vargin-properties />
      </section>
    </article>
  `,
  directives: [ExpandableGroups, VarginWorkspace, VarginProperties]
})

class Vargin {
  constructor() {
    ControlGroup.register(
      'visual',
      'Visual',
      'Visual components',
      [
        ControlService.getMetadata('label'),
        ControlService.getMetadata('button'),
        ControlService.getMetadata('container'),
        ControlService.getMetadata('range')
      ]
    );

    ControlGroup.register(
      'service',
      'Service',
      'Service components',
      [ControlService.getMetadata('datasource')]
    );
  }
}

bootstrap(Vargin);