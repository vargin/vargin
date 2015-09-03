import {
  DOMStaticControlCompiler
} from 'compilers/dom/dom-static/control-compilers/dom-static-control-compiler';
import { ButtonControl } from 'core/controls/visual/button-control';

export class ButtonControlCompiler
       extends DOMStaticControlCompiler<ButtonControl> {
  getMarkup(control: ButtonControl, cssClass) {
    return this.buildHTMLElement(
      'button',
      control.text.getValue(),
      new Map<string, string>([
        ['class', cssClass.name],
        ['title', control.title.getValue()],
        ['type', control.type.getValue()]
      ])
    );
  }
}