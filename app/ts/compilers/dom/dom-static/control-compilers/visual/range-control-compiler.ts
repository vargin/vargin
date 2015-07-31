import {
  DOMStaticControlCompiler
} from 'compilers/dom/dom-static/control-compilers/dom-static-control-compiler';
import { RangeControl } from 'core/controls/visual/range-control';

export class RangeControlCompiler
       extends DOMStaticControlCompiler<RangeControl> {
  getMarkup(control: RangeControl, cssClass) {
    return `
      <input
        type="range"
        class="${cssClass.name}"
        min="${control.min.getValue()}"
        max="${control.max.getValue()}"
        step="${control.step.getValue()}"
        value="${control.value.getValue()}"
      />
    `;
  }
}