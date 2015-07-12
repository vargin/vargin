/// <reference path="../../../../../typings/tsd.d.ts" />
import BaseControl from 'core/controls/base-control';
import { ControlProperty } from 'core/controls/control-property';

class ContainerControlProperties {
}

class ContainerControl extends BaseControl<ContainerControlProperties> {
  public children: Array<BaseControl<any>> = [];

  constructor() {
    super('container', 'Container', 'Component container', 'visual');
  }
}

export default ContainerControl;