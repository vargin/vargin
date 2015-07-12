/// <reference path="../../../../../typings/tsd.d.ts" />
import BaseControl from 'core/controls/base-control';
import {
  ControlProperty,
  TextControlProperty
} from 'core/controls/control-property';

export class LabelControlProperties {
  text: TextControlProperty;

  constructor(text: string) {
    this.text = new TextControlProperty(text);
  }
}

export class LabelControl extends BaseControl<LabelControlProperties> {
  constructor(properties?: LabelControlProperties) {
    super(
      'label',
      'Label',
      'HTML Label',
      'visual',
      properties || new LabelControlProperties('[Text]')
    );
  }
}