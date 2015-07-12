/// <reference path="../../../../typings/tsd.d.ts" />
import { Component, View } from 'angular2/angular2';

import ContainerControl from 'core/controls/visual/container-control';
import {
  LabelControl,
  LabelControlProperties
} from 'core/controls/visual/label-control';
import ButtonControl from 'core/controls/visual/button-control';
import RangeControl from 'core/controls/visual/range-control';

import ContainerComponent from 'core/components/visual/container-component';

@Component({
  selector: 'vargin-workspace'
})

@View({
  template: `<vargin-container [control]="_rootControl"/>`,
  directives: [ContainerComponent]
})

class VarginWorkspace {
  private _rootControl: ContainerControl;

  constructor() {
    this._rootControl = new ContainerControl();

    var nestedNestedControl = new ContainerControl();
    nestedNestedControl.children = [
      new LabelControl(new LabelControlProperties('[Nested-1] Label1')),
      new ButtonControl(),
      new LabelControl(new LabelControlProperties('[Nested-1] Label2')),
      new ButtonControl()
    ];

    var nestedControl = new ContainerControl();
    nestedControl.children = [
      new LabelControl(new LabelControlProperties('[Nested] Label1')),
      new ButtonControl(),
      new LabelControl(new LabelControlProperties('[Nested] Label2')),
      new ButtonControl(),
      nestedNestedControl
    ];

    this._rootControl.children = [
      new LabelControl(new LabelControlProperties('[Root] Label1')),
      new ButtonControl(),
      new LabelControl(new LabelControlProperties('[Root] Label2')),
      new ButtonControl(),
      new RangeControl(),
      nestedControl
    ];
  }
}

export default VarginWorkspace;