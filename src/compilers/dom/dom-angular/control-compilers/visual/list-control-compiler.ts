import {
  DOMAngularControlCompiler
} from 'compilers/dom/dom-angular/control-compilers/dom-angular-control-compiler';
import { ListControl } from 'core/controls/visual/list-control';
import { ICompiledCSSClass } from 'compilers/dom/css-compiler';

export class ListControlCompiler extends DOMAngularControlCompiler<ListControl> {
  getMarkup(control: ListControl, cssClass: ICompiledCSSClass) {
    /*let datasourceId = control.datasource.getValue();
    if (datasourceId) {
      control.getTemplate().
    }*/
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
