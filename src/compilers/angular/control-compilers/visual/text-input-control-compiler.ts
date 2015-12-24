import { AngularControlCompiler } from '../angular-control-compiler';
import {
  TextInputControl
} from '../../../../core/controls/visual/text-input-control';

export class TextInputControlCompiler extends AngularControlCompiler<TextInputControl> {
  getMarkup(control: TextInputControl) {
    let inputMarkup = this.buildHTMLElement(
      'input',
      '',
      new Map<string, string>(
        <[string, string][]>[
          ['type', 'text'],
          ['placeholder', this.bindValue(control, 'placeholder')],
          ['value', this.bindValue(control, 'value')]
        ]
      ));

    return this.buildHTMLElement(
      'vargin-input',
      inputMarkup,
      new Map<string, string>(
        <[string, string][]>[
          ['id', control.id],
          ['vargin-type', 'text-input'],
          ['class', this.bindCSSClass(control)],
          ...this.getEventHandlers(control)
        ]
      )
    );
  }
}
