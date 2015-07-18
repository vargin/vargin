/// <reference path="../../../../../typings/tsd.d.ts" />
import { BaseVisualControl } from 'core/controls/visual/base-visual-control';
import { IProperty, Property } from 'core/property';

class RangeControlProperties {
  min: IProperty<number>;
  max: IProperty<number>;
  step: IProperty<number>;
  value: IProperty<number>;

  constructor(
    min: number = 0,
    max: number = 100,
    step: number = 1,
    value: number = 0
  ) {
    this.min = new Property<number>('Minimum', min);
    this.max = new Property<number>('Maximum', max);
    this.step = new Property<number>('Step', step);
    this.value = new Property<number>('Value', value);
  }
}

class RangeControl extends BaseVisualControl<RangeControlProperties> {
  constructor(
    properties?: RangeControlProperties,
    styles?: { [key: string]: string; }
  ) {
    super(
      'range',
      'Number Range',
      'Number Range',
      properties || new RangeControlProperties(),
      styles
    );
  }
}

export default RangeControl;