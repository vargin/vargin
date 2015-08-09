import {
  DOMAngularControlCompiler
} from 'compilers/dom/dom-angular/control-compilers/dom-angular-control-compiler';
import { ButtonControl } from 'core/controls/visual/button-control';

export class ButtonControlCompiler extends DOMAngularControlCompiler<ButtonControl> {
  getMarkup(control: ButtonControl, cssClass) {
    return this.buildHTMLElement('button', control.text.getValue(), new Map([
      ['id', control.id],
      ['class', cssClass.name],
      ['title', control.title.getValue()],
      ['type', control.type.getValue()],
      ...this.getEventHandlers(control)
    ]));
  }
}