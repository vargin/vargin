import { AngularControlCompiler } from '../angular-control-compiler';
import {
  ListControl,
  ListItemControl
} from '../../../../core/controls/visual/list-control';

export class ListItemControlCompiler extends AngularControlCompiler<ListItemControl> {
  getMarkup(control: ListItemControl) {
    return this.buildHTMLElement(
      'div',
      control.getChildren().length ? '{children}' : '',
      new Map<string, string>(<[string, string][]>[
        ['*ngIf', `template.id === '${control.id}'`],
        ['id', control.id],
        ['class', this.bindCSSClass(control)],
        ...this.getEventHandlers(control)
      ])
    );
  }
}
