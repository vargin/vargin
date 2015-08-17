import {
  DOMAngularControlCompiler
} from 'compilers/dom/dom-angular/control-compilers/dom-angular-control-compiler';
import { TextInputControl } from 'core/controls/visual/text-input-control';

export class TextInputControlCompiler
       extends DOMAngularControlCompiler<TextInputControl> {
  getMarkup(control: TextInputControl, cssClass) {
    return this.buildHTMLElement('input', '', new Map([
      ['id', control.id],
      ['class', cssClass.name],
      ['type', 'text'],
      ['placeholder', control.placeholder.getValue()],
      ['value', control.value.getValue()],
      ...this.getEventHandlers(control)
    ]));
  }
}