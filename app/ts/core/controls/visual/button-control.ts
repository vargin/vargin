/// <reference path="../../../../../typings/tsd.d.ts" />
import BaseVisualControl from 'core/controls/visual/base-visual-control';
import {
  ControlProperty,
  TextControlProperty,
  TitleControlProperty,
  PredefinedControlProperty
} from 'core/controls/control-property';

const BUTTON_TYPES = [
  new ControlProperty<string>('Submit', 'submit'),
  new ControlProperty<string>('Reset', 'reset'),
  new ControlProperty<string>('Button', 'button')
];

const DEFAULT_STYLES = <{ [key: string]: string; }> {
  'background-color': 'green'
};

class ButtonControlProperties {
  text: TextControlProperty;
  title: TitleControlProperty;
  type: PredefinedControlProperty;

  constructor(text: string, title: string, type: string = 'submit') {
    this.text = new TextControlProperty(text);
    this.title = new TitleControlProperty(title);

    this.type = new PredefinedControlProperty(
      'Type',
      BUTTON_TYPES,
      BUTTON_TYPES.find((option) => option.value === type).value
    );
  }
}

class ButtonControl extends BaseVisualControl<ButtonControlProperties> {
  constructor(
    properties?: ButtonControlProperties,
    styles?: Map<string, string>
  ) {
    super(
      'button',
      'Button',
      'HTML Button',
      properties || new ButtonControlProperties('[Text]', '[Title]'),
      Object.assign({}, DEFAULT_STYLES, styles || {})
    );
  }
}

export default ButtonControl;