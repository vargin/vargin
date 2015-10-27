import {
  DOMAngularControlCompiler
} from 'compilers/dom/dom-angular/control-compilers/dom-angular-control-compiler';
import { ContainerControl } from 'core/controls/visual/container-control';
import { ICompiledCSSClass } from 'compilers/dom/css-compiler';

export class ContainerControlCompiler extends DOMAngularControlCompiler<ContainerControl> {
  getMarkup(control: ContainerControl, cssClass: ICompiledCSSClass) {
    return this.buildHTMLElement(
      'div',
      control.getChildren().length ? '{children}' : '',
      new Map<string, string>([
        ['id', control.id],
        ['class', cssClass.name],
        ...this.getEventHandlers(control)
      ])
    );
  }
}