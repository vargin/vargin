/// <reference path="../../../../typings/tsd.d.ts" />
import { Component, View } from 'angular2/angular2';

import ContainerControl from 'core/controls/visual/container-control';
import LabelControl from 'core/controls/visual/label-control';
import ButtonControl from 'core/controls/visual/button-control';
import RangeControl from 'core/controls/visual/range-control';

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
    this._rootControl = ControlService.create<ContainerControl>('container');

    var nestedNestedControl = ControlService.create<ContainerControl>(
      'container'
    );
    nestedNestedControl.children = [
      ControlService.create('label', new Map([['text', '[Nested-1] Label1']])),
      ControlService.create('button'),
      ControlService.create('label', new Map([['text', '[Nested-1] Label2']])),
      ControlService.create('button')
    ];

    var nestedControl = ControlService.create<ContainerControl>('container');
    nestedControl.children = [
      ControlService.create('label', new Map([['text', '[Nested] Label1']])),
      ControlService.create('button'),
      ControlService.create('label', new Map([['text', '[Nested] Label2']])),
      ControlService.create('button'),
      nestedNestedControl
    ];

    this._rootControl.children = [
      ControlService.create(
        'label',
        new Map([['text', '[Root] Label1']]),
        new Map([['color', '#0000ff'], ['text-decoration', 'line-through']])
      ),
      ControlService.create(
        'button', null, new Map([['border', '3px dashed blue']])
      ),
      ControlService.create('label', new Map([['text', '[Root] Label2']])),
      ControlService.create('button'),
      ControlService.create(
        'range', null, new Map([['opacity', '0.5']])
      ),
      nestedControl
    ];
  }
}

export default VarginWorkspace;