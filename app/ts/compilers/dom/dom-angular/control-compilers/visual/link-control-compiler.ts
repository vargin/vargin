import {
  DOMAngularControlCompiler
} from 'compilers/dom/dom-angular/control-compilers/dom-angular-control-compiler';
import { LinkControl } from 'core/controls/visual/link-control';
import { ICompiledCSSClass } from 'compilers/dom/css-compiler';

export class LinkControlCompiler extends DOMAngularControlCompiler<LinkControl> {
  getMarkup(control: LinkControl, cssClass: ICompiledCSSClass) {
    // Here we should be smart and analyze if any of the control properties
    // can be changed, if it's it should be replaced with dynamic markup,
    // otherwise we should render static value.
    return this.buildHTMLElement(
      'a',
      DOMAngularControlCompiler.getDynamicPropertyValue(control, 'text'),
      new Map<string, string>([
        ['id', control.id],
        ['class', cssClass.name],
        ['href', control.address.getValue()],
        [
          'title',
          DOMAngularControlCompiler.getDynamicPropertyValue(control, 'title')
        ],
        ['target', control.target.getValue()],
        ...this.getEventHandlers(control)
      ])
    );
  }
}
