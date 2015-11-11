import { DOMStaticControlCompiler } from '../dom-static-control-compiler';
import {
  TextInputControl
} from '../../../../../core/controls/visual/text-input-control';
import { ICompiledCSSClass } from '../../../css-compiler';

export class TextInputControlCompiler extends DOMStaticControlCompiler<TextInputControl> {
  getMarkup(control: TextInputControl, cssClass: ICompiledCSSClass) {
    return this.buildHTMLElement('input', '', new Map<string, string>(
      <[string, string][]>[
        ['class', cssClass.name],
        ['type', 'text'],
        ['placeholder', this.bindValue(control, 'placeholder')],
        ['value', this.bindValue(control, 'value')]
      ]
    ));
  }
}
