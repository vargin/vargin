/// <reference path="../../../../../typings/tsd.d.ts" />
import BaseControl from 'core/controls/base-control';
import { ControlProperty } from 'core/controls/control-property';

class RangeControlProperties {
  min: ControlProperty<number>;
  max: ControlProperty<number>;
  step: ControlProperty<number>;
  value: ControlProperty<number>;

  constructor(
    min: number = 0,
    max: number = 100,
    step: number = 1,
    value: number = 0
  ) {
    this.min = new ControlProperty<number>('Minimum', min);
    this.max = new ControlProperty<number>('Maximum', max);
    this.step = new ControlProperty<number>('Step', step);
    this.value = new ControlProperty<number>('Value', value);
  }
}

class RangeControl extends BaseControl<RangeControlProperties> {
  constructor(properties?: RangeControlProperties) {
    super(
      'range',
      'Number Range',
      'Number Range',
      'visual',
      properties || new RangeControlProperties()
    );
  }
}

export default RangeControl;