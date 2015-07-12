/// <reference path="../../../../../typings/tsd.d.ts" />
import BaseControl from 'core/controls/base-control';
import {
    ControlProperty,
    TextControlProperty,
    TitleControlProperty
} from 'core/controls/control-property';

class ButtonControlProperties {
  text: TextControlProperty;
  title: TitleControlProperty;

  constructor(text: string, title: string) {
    this.text = new TextControlProperty(text);
    this.title = new TitleControlProperty(title);
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