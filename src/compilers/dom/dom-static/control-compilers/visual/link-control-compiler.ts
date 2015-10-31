import {
  DOMStaticControlCompiler
} from 'compilers/dom/dom-static/control-compilers/dom-static-control-compiler';
import { LinkControl } from 'core/controls/visual/link-control';
import { ICompiledCSSClass } from 'compilers/dom/css-compiler';
import { Address, AddressType } from 'core/data/address';

export class LinkControlCompiler extends DOMStaticControlCompiler<LinkControl> {
  getMarkup(control: LinkControl, cssClass: ICompiledCSSClass) {
    let addressString = control.address.getValue();
    let address = addressString ?
      Address.deserialize(addressString) : new Address();

    return this.buildHTMLElement(
      'a',
      this.bindValue(control, 'text'),
      new Map<string, string>(<[string, string][]>[
        ['class', cssClass.name],
        ['title', this.bindValue(control, 'title')],
        ['target', this.bindValue(control, 'target')],
        ['href', address.value]
      ])
    );
  }
}
