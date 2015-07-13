/// <reference path="../../../../../typings/tsd.d.ts" />
import BaseControl from 'core/controls/base-control';
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

class ButtonControlProperties {
  text: TextControlProperty;
  title: TitleControlProperty;
  type: PredefinedControlProperty;

  constructor(text: string, title: string, type: string = 'submit') {
    this.text = new TextControlProperty(text);
    this.title = new TitleControlProperty(title);

    this.type = new PredefinedControlProperty(
      'Type', BUTTON_TYPES, BUTTON_TYPES.find((option) => option.value === type)
    );
  }
}

class ButtonControl extends BaseControl<ButtonControlProperties> {
  constructor(properties?: ButtonControlProperties) {
    super(
      'button',
      'Button',
      'HTML Button',
      'visual',
      properties || new ButtonControlProperties('[Text]', '[Title]')
    );
  }
}

export default ButtonControl;