/// <reference path="../../../../../typings/tsd.d.ts" />
import BaseControl from 'core/controls/base';

class ContainerControl extends BaseControl {
  public children: Array<BaseControl> = [];

  constructor() {
    super('container', 'Container', 'Component container', 'visual');
  }
}

export default ContainerControl;