import { DOMStaticControlCompiler } from '../dom-static-control-compiler';
import { ListControl } from '../../../../../core/controls/visual/list-control';

export class ListControlCompiler extends DOMStaticControlCompiler<ListControl> {
  getMarkup(control: ListControl) {
    return this.buildHTMLElement(
      'div',
      control.getChildren().length ? '{children}' : '',
      new Map<string, string>(<[string, string][]>[
        ['class', this.bindCSSClass(control)]
      ])
    );
  }
}
