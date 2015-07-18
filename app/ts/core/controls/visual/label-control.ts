/// <reference path="../../../../../typings/tsd.d.ts" />
import { BaseVisualControl } from 'core/controls/visual/base-visual-control';
import { IProperty, Property } from 'core/property';

export class LabelControlProperties {
  text: IProperty<string>;

  constructor(text: string) {
    this.text = new Property('Text', text);
  }
}

const DEFAULT_STYLES = <{ [key: string]: string; }> {
  'background-color': 'red'
};

export class LabelControl extends BaseVisualControl<LabelControlProperties> {
  constructor(
    properties?: LabelControlProperties,
    styles?: { [key: string]: string; }
  ) {
    super(
      'label',
      'Label',
      'HTML Label',
      properties || new LabelControlProperties('[Text]'),
      Object.assign({}, DEFAULT_STYLES, styles || {})
    );
  }
}