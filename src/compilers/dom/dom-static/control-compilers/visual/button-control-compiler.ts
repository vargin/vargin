import { DOMStaticControlCompiler } from '../dom-static-control-compiler';
import { ButtonControl } from '../../../../../core/controls/visual/button-control';
import { ICompiledCSSClass } from '../../../css-compiler';

export class ButtonControlCompiler extends DOMStaticControlCompiler<ButtonControl> {
  getMarkup(control: ButtonControl, cssClass: ICompiledCSSClass) {
    return this.buildHTMLElement(
      'button',
      this.bindValue(control, 'text'),
      new Map<string, string>(<[string, string][]>[
        ['class', cssClass.name],
        ['title', this.bindValue(control, 'title')],
        ['type', this.bindValue(control, 'type')]
      ])
    );
  }
}
