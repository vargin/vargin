import { DOMStaticControlCompiler } from '../dom-static-control-compiler';
import { LabelControl } from '../../../../../core/controls/visual/label-control';
import { StringFormatter } from '../../../../../core/tools/string-formatter';

export class LabelControlCompiler extends DOMStaticControlCompiler<LabelControl> {
  getMarkup(control: LabelControl) {
    return this.buildHTMLElement(
      'span',
      StringFormatter.format(
        this.bindValue(control, 'text'),
        +control.getProperty('format').getValue()
      ),
      new Map<string, string>(<[string, string][]>[
        ['class', this.bindCSSClass(control)]
      ])
    );
  }
}
