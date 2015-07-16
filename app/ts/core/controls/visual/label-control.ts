/// <reference path="../../../../../typings/tsd.d.ts" />
import BaseVisualControl from 'core/controls/visual/base-visual-control';
import { TextControlProperty } from 'core/controls/control-property';

export class LabelControlProperties {
  text: TextControlProperty;

  constructor(text: string) {
    this.text = new TextControlProperty(text);
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