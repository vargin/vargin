import { DOMStaticControlCompiler } from '../dom-static-control-compiler';
import { ButtonControl } from '../../../../../core/controls/visual/button-control';

export class ButtonControlCompiler extends DOMStaticControlCompiler<ButtonControl> {
  getMarkup(control: ButtonControl) {
    return this.buildHTMLElement(
      'button',
      this.bindValue(control, 'text'),
      new Map<string, string>(<[string, string][]>[
        ['class', this.bindCSSClass(control)],
        ['title', this.bindValue(control, 'title')],
        ['type', this.bindValue(control, 'type')]
      ])
    );
  }
}
