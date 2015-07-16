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
import VarginWorkspace from 'editor/workspace/component';
import VarginProperties from 'editor/properties/component';

import ButtonControl from 'core/controls/visual/button-control';
import ContainerControl from 'core/controls/visual/container-control';
import RangeControl from 'core/controls/visual/range-control';
import { LabelControl } from 'core/controls/visual/label-control';
import DataSourceControl from 'core/controls/service/datasource-control';

import ControlGroup from 'core/controls/control-group';

import ControlService from 'services/control-service';

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
        new LabelControl(),
        new ButtonControl(),
        new ContainerControl(),
        new RangeControl()
      ]
    );

    ControlGroup.register(
      'service',
      'Service',
      'Service components',
      [new DataSourceControl()]
    );
  }
}

bootstrap(
  Vargin,
  [
   /* bind(ChangeDetection).toClass(DynamicChangeDetection),*/
    bind(ControlService).toValue(new ControlService())
  ]
);