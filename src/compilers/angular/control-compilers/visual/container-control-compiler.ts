import { AngularControlCompiler } from '../angular-control-compiler';
import {
  ContainerControl
} from '../../../../core/controls/visual/container-control';

export class ContainerControlCompiler extends AngularControlCompiler<ContainerControl> {
  getMarkup(control: ContainerControl) {
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
