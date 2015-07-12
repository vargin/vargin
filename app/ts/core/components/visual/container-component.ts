/// <reference path="../../../../../typings/tsd.d.ts" />
import {
  bind,
  Component,
  Inject,
  NgFor,
  Optional,
  View
} from 'angular2/angular2';

import BaseControl from 'core/controls/base-control';
import ContainerControl from 'core/controls/visual/container-control';

import DynamicComponent from 'core/components/dynamic-component';

@Component({
  selector: 'vargin-container',
  properties: ['control']
})

@View({
  template: `
    <vargin-dynamic *ng-for="#child of control.children" [control]="child">
    </vargin-dynamic>
  `,
  directives: [NgFor, DynamicComponent]
})

class ContainerComponent{
  private control: ContainerControl;

  constructor(@Optional() @Inject(BaseControl) control?: ContainerControl) {
    this.control = control || new ContainerControl();
  }
}

export default ContainerComponent;