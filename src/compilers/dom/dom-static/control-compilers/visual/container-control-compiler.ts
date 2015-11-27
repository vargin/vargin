import { DOMStaticControlCompiler } from '../dom-static-control-compiler';
import {
  ContainerControl
} from '../../../../../core/controls/visual/container-control';

export class ContainerControlCompiler extends DOMStaticControlCompiler<ContainerControl> {
  getMarkup(control: ContainerControl) {
    return this.buildHTMLElement(
      'div',
      control.getChildren().length ? '{children}' : '',
      new Map<string, string>(<[string, string][]>[
        ['class', this.bindCSSClass(control)]
      ])
    );
  }
}
