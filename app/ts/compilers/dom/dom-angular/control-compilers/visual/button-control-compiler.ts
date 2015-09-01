import {
  DOMAngularControlCompiler
} from 'compilers/dom/dom-angular/control-compilers/dom-angular-control-compiler';
import { ButtonControl } from 'core/controls/visual/button-control';

export class ButtonControlCompiler extends DOMAngularControlCompiler<ButtonControl> {
  getMarkup(control: ButtonControl, cssClass) {
    // Here we should be smart and analyze if any of the control properties
    // can be changed, if it's it should be replaced with dynamic markup,
    // otherwise we should render static value.
    return this.buildHTMLElement(
      'button',
      DOMAngularControlCompiler.getDynamicPropertyValue(control, 'text'),
      new Map([
        ['id', control.id],
        ['class', cssClass.name],
        [
          'title',
          DOMAngularControlCompiler.getDynamicPropertyValue(control, 'title')
        ],
        ['type', control.type.getValue()],
        ...this.getEventHandlers(control)
      ])
    );
  }
}