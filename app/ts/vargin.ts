/// <reference path="../../typings/tsd.d.ts" />
import {
  Component,
  View,
  ChangeDetection,
  DynamicChangeDetection,
  bootstrap,
  bind
} from 'angular2/angular2';

import ExpandableGroups from 'editor/expandable-groups/component';
import VarginWorkspace from 'editor/vargin-workspace/component';

import ButtonControl from 'core/controls/visual/button';
import ContainerControl from 'core/controls/visual/container';
import LabelControl from 'core/controls/visual/label';
import DataSourceControl from 'core/controls/service/datasource';

import ControlGroup from 'core/controls/group';

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
      <section class="vargin-editor__properties"></section>
    </article>
  `,
  directives: [ExpandableGroups, VarginWorkspace]
})

class Vargin {
  constructor() {
    ControlGroup.register(
      'visual',
      'Visual',
      'Visual components',
      [new LabelControl(), new ButtonControl(), new ContainerControl()]
    );

    ControlGroup.register(
      'service',
      'Service',
      'Service components',
      [new DataSourceControl()]
    );
  }
}

bootstrap(Vargin, [bind(ChangeDetection).toClass(DynamicChangeDetection)]);