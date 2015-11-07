import {
  DOMAngularControlCompiler
} from 'compilers/dom/dom-angular/control-compilers/dom-angular-control-compiler';
import { ButtonControl } from 'core/controls/visual/button-control';
import { ICompiledCSSClass } from 'compilers/dom/css-compiler';

export class ButtonControlCompiler extends DOMAngularControlCompiler<ButtonControl> {
  getMarkup(control: ButtonControl, cssClass: ICompiledCSSClass) {
    // Here we should be smart and analyze if any of the control properties
    // can be changed, if it's it should be replaced with dynamic markup,
    // otherwise we should render static value.
    return this.buildHTMLElement(
      'button',
      this.bindValue(control, 'text'),
      new Map<string, string>(<[string, string][]>[
        ['id', control.id],
        ['class', cssClass.name],
        ['title', this.bindValue(control, 'title')],
        ['type', control.getProperty('type').getValue()],
        ...this.getEventHandlers(control)
      ])
    );
  }
}
