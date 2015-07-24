/// <reference path="../../../../../typings/tsd.d.ts" />
import BaseVisualControl from 'core/controls/visual/base-visual-control';
import { IPropertyWithOptions } from 'core/property';

export default class ButtonControl extends BaseVisualControl {
  constructor(id, meta, properties?, styles?) {
    super(id, meta, properties, null, styles);
  }

  get text() {
    return this._properties.get('text');
  }

  get title() {
    return this._properties.get('title');
  }

  get type() {
    return <IPropertyWithOptions<string>>this._properties.get('type');
  }
}
