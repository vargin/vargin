import {
  DOMAngularControlCompiler
} from 'compilers/dom/dom-angular/control-compilers/dom-angular-control-compiler';
import { LabelControl } from 'core/controls/visual/label-control';

export class LabelControlCompiler extends DOMAngularControlCompiler<LabelControl> {
  getMarkup(control: LabelControl, cssClass) {
    return this.buildHTMLElement(
      'span',
      control.text.getValue(),
      new Map([
        ['id', control.id],
        ['class', cssClass.name],
        ...this.getEventHandlers(control)
      ])
    );
  }
}