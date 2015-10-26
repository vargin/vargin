import {
  DOMStaticControlCompiler
} from 'compilers/dom/dom-static/control-compilers/dom-static-control-compiler';
import { ListControl } from 'core/controls/visual/list-control';
import { ICompiledCSSClass } from 'compilers/dom/css-compiler';

export class ListControlCompiler extends DOMStaticControlCompiler<ListControl> {
  getMarkup(control: ListControl, cssClass: ICompiledCSSClass) {
    return this.buildHTMLElement(
      'div',
      control.getChildren().length ? '{children}' : '',
      new Map<string, string>([['class', cssClass.name]])
    );
  }
}
