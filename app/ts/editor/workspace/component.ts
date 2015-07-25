/// <reference path="../../../../typings/tsd.d.ts" />
import { Component, View } from 'angular2/angular2';

import ContainerControl from 'core/controls/visual/container-control';
import LabelControl from 'core/controls/visual/label-control';
import ButtonControl from 'core/controls/visual/button-control';
import RangeControl from 'core/controls/visual/range-control';

import { Action } from 'core/actions/action';
import { BroadcastAction } from 'core/actions/broadcast-action';

import ContainerComponent from 'core/components/visual/container-component';

import { ControlService } from 'services/control-service';

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
    this._rootControl = ControlService.create(ContainerControl);

    var nestedNestedControl = ControlService.create(ContainerControl);
    nestedNestedControl.children = [
      ControlService.create(LabelControl, {
        properties: new Map([['text', '[Nested-1] Label1']])
      }),
      ControlService.create(ButtonControl, {
        events:new Map([
          ['click', [
            new Action('Abstract', 'abstract'), new BroadcastAction(null, null)
          ]]
        ])
      }),
      ControlService.create(LabelControl, {
        properties: new Map([['text', '[Nested-1] Label2']])
      }),
      ControlService.create(ButtonControl)
    ];

    var nestedControl = ControlService.create(ContainerControl);
    nestedControl.children = [
      ControlService.create(LabelControl, {
        properties: new Map([['text', '[Nested] Label1']])
      }),
      ControlService.create(ButtonControl),
      ControlService.create(LabelControl, {
        properties: new Map([['text', '[Nested] Label2']])
      }),
      ControlService.create(ButtonControl),
      nestedNestedControl
    ];

    this._rootControl.children = [
      ControlService.create(LabelControl, {
        properties: new Map([['text', '[Root] Label1']]),
        styles: new Map([
          ['color', '#0000ff'], ['text-decoration', 'line-through']
        ])
      }),
      ControlService.create(ButtonControl, {
        styles: new Map([['border', '3px dashed blue']])
      }),
      ControlService.create(LabelControl, {
        properties: new Map([['text', '[Root] Label2']])
      }),
      ControlService.create(ButtonControl),
      ControlService.create(RangeControl, {
        styles: new Map([['opacity', '0.5']])
      }),
      nestedControl
    ];
  }
}

export default VarginWorkspace;