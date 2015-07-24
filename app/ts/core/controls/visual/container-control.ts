/// <reference path="../../../../../typings/tsd.d.ts" />
import BaseControl from 'core/controls/base-control';
import BaseVisualControl from 'core/controls/visual/base-visual-control';

export default class ContainerControl extends BaseVisualControl {
  public children: Array<BaseControl> = [];

  constructor(id, meta, properties?, styles?) {
    super(id, meta, properties, null, styles);
  }
}
