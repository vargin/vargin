import { DOMAngularControlCompiler } from '../dom-angular-control-compiler';
import { ListControl } from '../../../../../core/controls/visual/list-control';
import { ICompiledCSSClass } from '../../../css-compiler';

export class ListControlCompiler extends DOMAngularControlCompiler<ListControl> {
  getMarkup(control: ListControl, cssClass: ICompiledCSSClass) {
    return this.buildHTMLElement(
      'div',
      control.getChildren().length ? '{children}' : '',
      new Map<string, string>(<[string, string][]>[
        ['id', control.id],
        ['class', cssClass.name],
        ...this.getEventHandlers(control)
      ])
    );
  }
}
