import { DOMStaticControlCompiler } from '../dom-static-control-compiler';
import {
  ContainerControl
} from '../../../../../core/controls/visual/container-control';
import { ICompiledCSSClass } from '../../../css-compiler';

export class ContainerControlCompiler extends DOMStaticControlCompiler<ContainerControl> {
  getMarkup(control: ContainerControl, cssClass: ICompiledCSSClass) {
    return this.buildHTMLElement(
      'div',
      control.getChildren().length ? '{children}' : '',
      new Map<string, string>(<[string, string][]>[['class', cssClass.name]])
    );
  }
}
