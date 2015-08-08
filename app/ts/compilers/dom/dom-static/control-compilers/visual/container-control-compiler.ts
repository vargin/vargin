import {
  DOMStaticControlCompiler
} from 'compilers/dom/dom-static/control-compilers/dom-static-control-compiler';
import { ContainerControl } from 'core/controls/visual/container-control';

export class ContainerControlCompiler
extends DOMStaticControlCompiler<ContainerControl> {
  getMarkup(control: ContainerControl, cssClass) {
    return this.buildHTMLElement(
      'div',
      control.getChildren().length ? '{children}' : '',
      new Map([['class', cssClass.name]])
    );
  }
}