import {
  DOMStaticControlCompiler
} from 'compilers/dom/dom-static/control-compilers/dom-static-control-compiler';
import { LinkControl } from 'core/controls/visual/link-control';
import { ICompiledCSSClass } from 'compilers/dom/css-compiler';

export class LinkControlCompiler extends DOMStaticControlCompiler<LinkControl> {
  getMarkup(control: LinkControl, cssClass: ICompiledCSSClass) {
    return this.buildHTMLElement(
      'a',
      control.text.getValue(),
      new Map<string, string>([
        ['class', cssClass.name],
        ['title', control.title.getValue()],
        ['target', control.target.getValue()],
        ['href', control.address.getValue()]
      ])
    );
  }
}
