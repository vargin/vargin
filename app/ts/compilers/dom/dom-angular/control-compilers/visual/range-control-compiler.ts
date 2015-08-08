import {
  DOMAngularControlCompiler
} from 'compilers/dom/dom-angular/control-compilers/dom-angular-control-compiler';
import { RangeControl } from 'core/controls/visual/range-control';

export class RangeControlCompiler extends DOMAngularControlCompiler<RangeControl> {
  getMarkup(control: RangeControl, cssClass) {
    return this.buildHTMLElement('input', '', new Map([
      ['class', cssClass.name],
      ['type', 'range'],
      ['min', control.min.getValue()],
      ['max', control.max.getValue()],
      ['step', control.step.getValue()],
      ['value', control.value.getValue()],
      ...this.getEventHandlers(control)
    ]));
  }
}