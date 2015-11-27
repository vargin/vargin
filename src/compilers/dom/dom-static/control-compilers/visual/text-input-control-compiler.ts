import { DOMStaticControlCompiler } from '../dom-static-control-compiler';
import {
  TextInputControl
} from '../../../../../core/controls/visual/text-input-control';

export class TextInputControlCompiler extends DOMStaticControlCompiler<TextInputControl> {
  getMarkup(control: TextInputControl) {
    return this.buildHTMLElement('input', '', new Map<string, string>(
      <[string, string][]>[
        ['class', this.bindCSSClass(control)],
        ['type', 'text'],
        ['placeholder', this.bindValue(control, 'placeholder')],
        ['value', this.bindValue(control, 'value')]
      ]
    ));
  }
}
