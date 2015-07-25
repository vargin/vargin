/// <reference path="../../../../../typings/tsd.d.ts" />
import BaseVisualControl from 'core/controls/visual/base-visual-control';

export default class LabelControl extends BaseVisualControl {
  constructor(id, meta, properties?, styles?) {
    super(id, meta, properties, styles);
  }

  get text() {
    return this._properties.get('text');
  }
}