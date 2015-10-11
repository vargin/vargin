import {
  DOMStaticControlCompiler
} from 'compilers/dom/dom-static/control-compilers/dom-static-control-compiler';
import { LabelControl } from 'core/controls/visual/label-control';
import { ICompiledCSSClass } from 'compilers/dom/css-compiler';

export class LabelControlCompiler extends DOMStaticControlCompiler<LabelControl> {
  getMarkup(control: LabelControl, cssClass: ICompiledCSSClass) {
    return this.buildHTMLElement(
      'span',
      this.getValue(control.text),
      new Map<string, string>([['class', cssClass.name]])
    );
  }
}
