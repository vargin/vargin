import {
  DOMStaticControlCompiler
} from 'compilers/dom/dom-static/control-compilers/dom-static-control-compiler';
import { RangeControl } from 'core/controls/visual/range-control';
import { ICompiledCSSClass } from 'compilers/dom/css-compiler';

export class RangeControlCompiler extends DOMStaticControlCompiler<RangeControl> {
  getMarkup(control: RangeControl, cssClass: ICompiledCSSClass) {
    return this.buildHTMLElement('input', '', new Map<string, string>(
      <[string, string][]>[
        ['class', cssClass.name],
        ['type', 'range'],
        ['min', this.bindValue(control, 'min')],
        ['max', this.bindValue(control, 'max')],
        ['step', this.bindValue(control, 'step')],
        ['value', this.bindValue(control, 'value')]
      ]
    ));
  }
}
