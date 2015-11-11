import { IProperty, Property, PropertyWithOptions } from '../property';
import { IOverrides } from '../overrides/overrides';
import { Action } from './action';
import { ActionMetadata } from './action-metadata';

const SUPPORTED_PROPERTIES = new Map<string, IProperty<string>>(
  <[string, IProperty<string>][]>[
    ['address', new Property('Address', '', 'url')],
    ['target', new PropertyWithOptions('Target', [
      new Property('Same Tab', '_self'),
      new Property('New Tab', '_blank')
    ])]
  ]
);

const METADATA = Object.freeze(new ActionMetadata(
  'navigate-action',
  'Navigate',
  'Action that allows to navigate to another page',
  SUPPORTED_PROPERTIES
));

export class NavigateAction extends Action {
  constructor(overrides: IOverrides) {
    super(METADATA, overrides);
  }

  perform() {
    try {
      let target = this.properties.get('target').getValue();
      let address = this.properties.get('address').getValue();

      if (target === '_self') {
        location.href = address;
      } else {
        window.open(address, target);
      }
      return Promise.resolve(true);
    } catch (e) {
      return Promise.reject<boolean>(e);
    }
  }
}
