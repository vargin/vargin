import {
  DOMStaticControlCompiler
} from 'compilers/dom/dom-static/control-compilers/dom-static-control-compiler';
import { ButtonControl } from 'core/controls/visual/button-control';

export class ButtonControlCompiler
       extends DOMStaticControlCompiler<ButtonControl> {
  getMarkup(control: ButtonControl, cssClass) {
    return `<button class="${cssClass.name}"
                    title="${control.title.getValue()}"
                    type="${control.type.getValue()}"
              >${control.text.getValue()}</button>`;
  }
}