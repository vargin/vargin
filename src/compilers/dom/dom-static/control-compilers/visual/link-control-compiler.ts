import { DOMStaticControlCompiler } from '../dom-static-control-compiler';
import { LinkControl } from '../../../../../core/controls/visual/link-control';
import { Address, AddressType } from '../../../../../core/data/address';

export class LinkControlCompiler extends DOMStaticControlCompiler<LinkControl> {
  getMarkup(control: LinkControl) {
    let addressString = control.getProperty('address').getValue();
    let address = addressString ?
      Address.deserialize(addressString) : new Address();

    return this.buildHTMLElement(
      'a',
      this.bindValue(control, 'text'),
      new Map<string, string>(<[string, string][]>[
        ['class', this.bindCSSClass(control)],
        ['title', this.bindValue(control, 'title')],
        ['target', this.bindValue(control, 'target')],
        ['href', address.value]
      ])
    );
  }
}
