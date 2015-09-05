import {
  DOMStaticControlCompiler
} from 'compilers/dom/dom-static/control-compilers/dom-static-control-compiler';
import { RangeControl } from 'core/controls/visual/range-control';
import { ICompiledCSSClass } from 'compilers/dom/css-compiler';

export class RangeControlCompiler extends DOMStaticControlCompiler<RangeControl> {
  getMarkup(control: RangeControl, cssClass: ICompiledCSSClass) {
    return this.buildHTMLElement('input', '', new Map<string, string>([
      ['class', cssClass.name],
      ['type', 'range'],
      ['min', control.min.getValue()],
      ['max', control.max.getValue()],
      ['step', control.step.getValue()],
      ['value', control.value.getValue()]
    ]));
  }
}
