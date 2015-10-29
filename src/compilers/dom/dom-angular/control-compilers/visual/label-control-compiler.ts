import {
  DOMAngularControlCompiler
} from 'compilers/dom/dom-angular/control-compilers/dom-angular-control-compiler';
import { LabelControl } from 'core/controls/visual/label-control';
import { ICompiledCSSClass } from 'compilers/dom/css-compiler';

export class LabelControlCompiler extends DOMAngularControlCompiler<LabelControl> {
  getMarkup(control: LabelControl, cssClass: ICompiledCSSClass) {
    return this.buildHTMLElement(
      'span',
      DOMAngularControlCompiler.getDynamicPropertyValue(control, 'text'),
      new Map<string, string>(<[string, string][]>[
        ['id', control.id],
        ['class', cssClass.name],
        [
          'title',
          DOMAngularControlCompiler.getDynamicPropertyValue(control, 'title')
        ],
        ...this.getEventHandlers(control)
      ])
    );
  }
}
