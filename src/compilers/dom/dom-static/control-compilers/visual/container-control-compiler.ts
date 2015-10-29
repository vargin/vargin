import {
  DOMStaticControlCompiler
} from 'compilers/dom/dom-static/control-compilers/dom-static-control-compiler';
import { ContainerControl } from 'core/controls/visual/container-control';
import { ICompiledCSSClass } from 'compilers/dom/css-compiler';

export class ContainerControlCompiler extends DOMStaticControlCompiler<ContainerControl> {
  getMarkup(control: ContainerControl, cssClass: ICompiledCSSClass) {
    return this.buildHTMLElement(
      'div',
      control.getChildren().length ? '{children}' : '',
      new Map<string, string>(<[string, string][]>[['class', cssClass.name]])
    );
  }
}
