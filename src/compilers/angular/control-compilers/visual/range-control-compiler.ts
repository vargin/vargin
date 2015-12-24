import { AngularControlCompiler } from '../angular-control-compiler';
import { RangeControl } from '../../../../core/controls/visual/range-control';

export class RangeControlCompiler extends AngularControlCompiler<RangeControl> {
  getMarkup(control: RangeControl) {
    let inputMarkup = this.buildHTMLElement(
      'input',
      '',
      new Map<string, string>(
      <[string, string][]>[
        ['type', 'range'],
        ['min', this.bindValue(control, 'min')],
        ['max', this.bindValue(control, 'max')],
        ['step', this.bindValue(control, 'step')],
        ['value', this.bindValue(control, 'value')]
      ]
    ));

    return this.buildHTMLElement(
      'vargin-input',
      inputMarkup,
      new Map<string, string>(
        <[string, string][]>[
          ['id', control.id],
          ['vargin-type', 'range'],
          ['class', this.bindCSSClass(control)],
          ...this.getEventHandlers(control)
        ]
      )
    );
  }
}
