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
      control.text.getValue(),
      new Map<string, string>([
        ['class', cssClass.name],
        ['title', control.title.getValue()],
        ['target', control.target.getValue()],
        ['href', address.value]
      ])
    );
  }
}
