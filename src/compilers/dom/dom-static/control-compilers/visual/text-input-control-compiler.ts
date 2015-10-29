import {
  DOMStaticControlCompiler
} from 'compilers/dom/dom-static/control-compilers/dom-static-control-compiler';
import { TextInputControl } from 'core/controls/visual/text-input-control';
import { ICompiledCSSClass } from 'compilers/dom/css-compiler';

export class TextInputControlCompiler extends DOMStaticControlCompiler<TextInputControl> {
  getMarkup(control: TextInputControl, cssClass: ICompiledCSSClass) {
    return this.buildHTMLElement('input', '', new Map<string, string>(
      <[string, string][]>[
        ['class', cssClass.name],
        ['type', 'text'],
        ['placeholder', this.getValue(control.placeholder)],
        ['value', this.getValue(control.value)]
      ]
    ));
  }
}
