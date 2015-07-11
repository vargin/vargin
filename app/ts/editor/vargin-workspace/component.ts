/// <reference path="../../../../typings/tsd.d.ts" />

import { Component, View } from 'angular2/angular2';

import ContainerControl from 'core/controls/visual/container';
import LabelControl from 'core/controls/visual/label';
import ButtonControl from 'core/controls/visual/button';

import ContainerComponent from 'core/components/visual/container';

@Component({
  selector: 'vargin-workspace'
})

@View({
  template: `<vargin-container [control]="rootControl" />`,
  directives: [ContainerComponent]
})

class VarginWorkspace {
  private rootControl: ContainerControl;

  constructor() {
    this.rootControl = new ContainerControl();

    var nestedNestedControl = new ContainerControl();
    nestedNestedControl.children = [
      new LabelControl('[Nested-1] Label1'),
      new ButtonControl(),
      new LabelControl('[Nested-1] Label2'),
      new ButtonControl()
    ];

    var nestedControl = new ContainerControl();
    nestedControl.children = [
      new LabelControl('[Nested] Label1'),
      new ButtonControl(),
      new LabelControl('[Nested] Label2'),
      new ButtonControl(),
      nestedNestedControl
    ];

    this.rootControl.children = [
      new LabelControl('[Root] Label1'),
      new ButtonControl(),
      new LabelControl('[Root] Label2'),
      new ButtonControl(),
      nestedControl
    ];
  }
}

export default VarginWorkspace;