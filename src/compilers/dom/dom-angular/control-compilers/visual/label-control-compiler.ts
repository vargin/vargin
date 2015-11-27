import { DOMAngularControlCompiler } from '../dom-angular-control-compiler';
import {
  LabelControl
} from '../../../../../core/controls/visual/label-control';
import { StringFormatter } from '../../../../../core/tools/string-formatter';

export class LabelControlCompiler extends DOMAngularControlCompiler<LabelControl> {
  getMarkup(control: LabelControl) {
    let formatPipe = StringFormatter.toPipe(
      +control.getProperty('format').getValue()
    );
    let value = this.bindValue(control, 'text');

    return this.buildHTMLElement(
      'span',
      formatPipe ? value.replace('}}', `| ${formatPipe} }}`) : value,
      new Map<string, string>(<[string, string][]>[
        ['id', control.id],
        ['class', this.bindCSSClass(control)],
        ['title', this.bindValue(control, 'title')],
        ...this.getEventHandlers(control)
      ])
    );
  }
}
