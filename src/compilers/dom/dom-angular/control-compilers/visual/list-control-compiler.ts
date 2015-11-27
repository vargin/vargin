import { DOMAngularControlCompiler } from '../dom-angular-control-compiler';
import { ListControl } from '../../../../../core/controls/visual/list-control';

export class ListControlCompiler extends DOMAngularControlCompiler<ListControl> {
  getMarkup(control: ListControl) {
    return this.buildHTMLElement(
      'div',
      control.getChildren().length ? '{children}' : '',
      new Map<string, string>(<[string, string][]>[
        ['id', control.id],
        ['class', this.bindCSSClass(control)],
        ...this.getEventHandlers(control)
      ])
    );
  }
}
