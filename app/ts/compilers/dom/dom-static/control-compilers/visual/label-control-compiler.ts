import {
  DOMStaticControlCompiler
} from 'compilers/dom/dom-static/control-compilers/dom-static-control-compiler';
import { LabelControl } from 'core/controls/visual/label-control';

export class LabelControlCompiler
       extends DOMStaticControlCompiler<LabelControl> {
  getMarkup(control: LabelControl, cssClass) {
    return `<span class="${cssClass.name}">${control.text.getValue()}</span>`;
  }
}