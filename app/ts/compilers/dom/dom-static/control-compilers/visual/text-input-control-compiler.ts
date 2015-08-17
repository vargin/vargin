import {
  DOMStaticControlCompiler
} from 'compilers/dom/dom-static/control-compilers/dom-static-control-compiler';
import { TextInputControl } from 'core/controls/visual/text-input-control';

export class TextInputControlCompiler
       extends DOMStaticControlCompiler<TextInputControl> {
  getMarkup(control: TextInputControl, cssClass) {
    return this.buildHTMLElement('input', '', new Map([
      ['class', cssClass.name],
      ['type', 'text'],
      ['placeholder', control.placeholder.getValue()],
      ['value', control.value.getValue()]
    ]));
  }
}