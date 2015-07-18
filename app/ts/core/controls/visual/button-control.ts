/// <reference path="../../../../../typings/tsd.d.ts" />
import { BaseVisualControl } from 'core/controls/visual/base-visual-control';
import {
  IProperty,
  IPropertyWithOptions,
  Property,
  PropertyWithOptions
} from 'core/property';

const BUTTON_TYPES = [
  new Property<string>('Submit', 'submit'),
  new Property<string>('Reset', 'reset'),
  new Property<string>('Button', 'button')
];

const DEFAULT_STYLES = <{ [key: string]: string; }> {
  'background-color': 'green'
};

class ButtonControlProperties {
  text: IProperty<string>;
  title: IProperty<string>;
  type: IPropertyWithOptions<string>;

  constructor(text: string, title: string, type: string = 'submit') {
    this.text = new Property('Text', text);
    this.title = new Property('Title', title);

    this.type = new PropertyWithOptions(
      'Type',
      BUTTON_TYPES,
      BUTTON_TYPES.find((option) => option.getValue() === type).getValue()
    );
  }
}

class ButtonControl extends BaseVisualControl<ButtonControlProperties> {
  constructor(
    properties?: ButtonControlProperties,
    styles?: { [key: string]: string; }
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