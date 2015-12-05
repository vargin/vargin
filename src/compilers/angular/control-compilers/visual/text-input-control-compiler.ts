import { AngularControlCompiler } from '../angular-control-compiler';
import {
  TextInputControl
} from '../../../../core/controls/visual/text-input-control';

export class TextInputControlCompiler extends AngularControlCompiler<TextInputControl> {
  getMarkup(control: TextInputControl) {
    return this.buildHTMLElement('input', '', new Map<string, string>(
      <[string, string][]>[
        ['id', control.id],
        ['class', this.bindCSSClass(control)],
        ['type', 'text'],
        ['placeholder', this.bindValue(control, 'placeholder')],
        ['value', this.bindValue(control, 'value')],
        ...this.getEventHandlers(control)
      ]
    ));
  }
}
