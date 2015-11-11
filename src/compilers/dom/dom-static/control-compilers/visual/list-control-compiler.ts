import { DOMStaticControlCompiler } from '../dom-static-control-compiler';
import { ListControl } from '../../../../../core/controls/visual/list-control';
import { ICompiledCSSClass } from '../../../css-compiler';

export class ListControlCompiler extends DOMStaticControlCompiler<ListControl> {
  getMarkup(control: ListControl, cssClass: ICompiledCSSClass) {
    return this.buildHTMLElement(
      'div',
      control.getChildren().length ? '{children}' : '',
      new Map<string, string>(<[string, string][]>[['class', cssClass.name]])
    );
  }
}
