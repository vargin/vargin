import { DOMStaticControlCompiler } from '../dom-static-control-compiler';
import {
  RangeControl
} from '../../../../../core/controls/visual/range-control';

export class RangeControlCompiler extends DOMStaticControlCompiler<RangeControl> {
  getMarkup(control: RangeControl) {
    return this.buildHTMLElement('input', '', new Map<string, string>(
      <[string, string][]>[
        ['class', this.bindCSSClass(control)],
        ['type', 'range'],
        ['min', this.bindValue(control, 'min')],
        ['max', this.bindValue(control, 'max')],
        ['step', this.bindValue(control, 'step')],
        ['value', this.bindValue(control, 'value')]
      ]
    ));
  }
}
