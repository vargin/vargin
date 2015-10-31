import {
  DOMAngularControlCompiler
} from 'compilers/dom/dom-angular/control-compilers/dom-angular-control-compiler';
import { LinkControl } from 'core/controls/visual/link-control';
import { ICompiledCSSClass } from 'compilers/dom/css-compiler';
import { Address, AddressType } from 'core/data/address';

export class LinkControlCompiler extends DOMAngularControlCompiler<LinkControl> {
  getMarkup(control: LinkControl, cssClass: ICompiledCSSClass) {
    let addressString = control.address.getValue();
    let address = addressString ?
      Address.deserialize(addressString) : new Address();

    let addressAttribute: [string, string] =
      address.type === AddressType.APP_PAGE ?
        ['[router-link]', `[\'/Page\', { id: \'${address.value}\' }]`] :
        ['href', address.value];

    // Here we should be smart and analyze if any of the control properties
    // can be changed, if it's it should be replaced with dynamic markup,
    // otherwise we should render static value.
    return this.buildHTMLElement(
      'a',
      this.bindValue(control, 'text'),
      new Map<string, string>(<[string, string][]>[
        ['id', control.id],
        ['class', cssClass.name],
        addressAttribute,
        ['title', this.bindValue(control, 'title')],
        ['target', control.target.getValue()],
        ...this.getEventHandlers(control)
      ])
    );
  }
}
