import {
  DOMStaticControlCompiler
} from 'compilers/dom/dom-static/control-compilers/dom-static-control-compiler';
import { ContainerControl } from 'core/controls/visual/container-control';

export class ContainerControlCompiler
extends DOMStaticControlCompiler<ContainerControl> {
  getMarkup(control: ContainerControl, cssClass) {
    return `
      <div class="${cssClass.name}">
        ${control.getChildren().length ? '{children}' : ''}
      </div>
    `;
  }
}