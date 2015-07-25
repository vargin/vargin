/// <reference path="../../../../../typings/tsd.d.ts" />
import BaseVisualControl from 'core/controls/visual/base-visual-control';

export default class RangeControl extends BaseVisualControl {
  constructor(id, meta, properties?, styles?) {
    super(id, meta, properties, styles);
  }

  get min() {
    return this._properties.get('min');
  }

  get max() {
    return this._properties.get('max');
  }

  get step() {
    return this._properties.get('step');
  }

  get value() {
    return this._properties.get('value');
  }
}
