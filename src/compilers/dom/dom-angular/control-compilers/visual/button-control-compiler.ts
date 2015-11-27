import { DOMAngularControlCompiler } from '../dom-angular-control-compiler';
import {
  ButtonControl
} from '../../../../../core/controls/visual/button-control';

export class ButtonControlCompiler extends DOMAngularControlCompiler<ButtonControl> {
  getMarkup(control: ButtonControl) {
    // Here we should be smart and analyze if any of the control properties
    // can be changed, if it's it should be replaced with dynamic markup,
    // otherwise we should render static value.
    return this.buildHTMLElement(
      'button',
      this.bindValue(control, 'text'),
      new Map<string, string>(<[string, string][]>[
        ['id', control.id],
        ['class', this.bindCSSClass(control)],
        ['title', this.bindValue(control, 'title')],
        ['type', control.getProperty('type').getValue()],
        ...this.getEventHandlers(control)
      ])
    );
  }
}
