import {
  DOMAngularControlCompiler
} from 'compilers/dom/dom-angular/control-compilers/dom-angular-control-compiler';
import { LabelControl } from 'core/controls/visual/label-control';

export class LabelControlCompiler extends DOMAngularControlCompiler<LabelControl> {
  getMarkup(control: LabelControl, cssClass) {
    return this.buildHTMLElement(
      'span',
      this.getDynamicPropertyValue(control, 'text'),
      new Map([
        ['id', control.id],
        ['class', cssClass.name],
        ['title', this.getDynamicPropertyValue(control, 'title')],
        ...this.getEventHandlers(control)
      ])
    );
  }
}