import { AngularControlCompiler } from '../angular-control-compiler';
import { RangeControl } from '../../../../core/controls/visual/range-control';

export class RangeControlCompiler extends AngularControlCompiler<RangeControl> {
  getMarkup(control: RangeControl) {
    return this.buildHTMLElement('input', '', new Map<string, string>(
      <[string, string][]>[
        ['id', control.id],
        ['class', this.bindCSSClass(control)],
        ['type', 'range'],
        ['min', this.bindValue(control, 'min')],
        ['max', this.bindValue(control, 'max')],
        ['step', this.bindValue(control, 'step')],
        ['value', this.bindValue(control, 'value')],
        ...this.getEventHandlers(control)
      ]
    ));
  }
}
