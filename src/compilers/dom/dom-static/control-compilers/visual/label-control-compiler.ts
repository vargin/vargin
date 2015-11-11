import { DOMStaticControlCompiler } from '../dom-static-control-compiler';
import { LabelControl } from '../../../../../core/controls/visual/label-control';
import { ICompiledCSSClass } from '../../../css-compiler';
import { StringFormatter } from '../../../../../core/tools/string-formatter';

export class LabelControlCompiler extends DOMStaticControlCompiler<LabelControl> {
  getMarkup(control: LabelControl, cssClass: ICompiledCSSClass) {
    return this.buildHTMLElement(
      'span',
      StringFormatter.format(
        this.bindValue(control, 'text'),
        +control.getProperty('format').getValue()
      ),
      new Map<string, string>(<[string, string][]>[['class', cssClass.name]])
    );
  }
}
