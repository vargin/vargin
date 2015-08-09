import {
  DOMAngularControlCompiler
} from 'compilers/dom/dom-angular/control-compilers/dom-angular-control-compiler';
import { ContainerControl } from 'core/controls/visual/container-control';

export class ContainerControlCompiler extends DOMAngularControlCompiler<ContainerControl> {
  getMarkup(control: ContainerControl, cssClass) {
    return this.buildHTMLElement(
      'div',
      control.getChildren().length ? '{children}' : '',
      new Map([
        ['id', control.id],
        ['class', cssClass.name],
        ...this.getEventHandlers(control)
      ])
    );
  }
}