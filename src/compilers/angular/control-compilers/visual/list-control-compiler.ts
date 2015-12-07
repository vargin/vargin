import { AngularControlCompiler } from '../angular-control-compiler';
import { ListControl } from '../../../../core/controls/visual/list-control';

export class ListControlCompiler extends AngularControlCompiler<ListControl> {
  getMarkup(control: ListControl) {
    let datasourceId = control.getProperty('datasource').getValue();

    return this.buildHTMLElement(
      'vargin-list',
      '',
      new Map<string, string>(<[string, string][]>[
        ['id', control.id],
        ['class', this.bindCSSClass(control)],
        ['[list]', `getControl(\'${control.id}\')`],
        ['[datasource]', `getDatasource('${datasourceId}')`],
        ...this.getEventHandlers(control)
      ])
    );
  }
}
