import { IProperty, Property } from '../property';
import { IOverrides } from '../overrides/overrides';
import { Action } from './action';
import { ActionMetadata } from './action-metadata';

const SUPPORTED_PROPERTIES = new Map<string, IProperty<string>>(
  <[string, IProperty<string>][]>[
    ['alert-message', new Property('Alert message', '')]
  ]
);

const METADATA = Object.freeze(new ActionMetadata(
  'alert-action',
  'Alert',
  'Action that allows to alert any message',
  SUPPORTED_PROPERTIES
));

export class AlertAction extends Action {
  constructor(overrides?: IOverrides) {
    super(METADATA, overrides);
  }

  perform() {
    try {
      alert(this.getProperty('alert-message').getValue());
      return Promise.resolve(true);
    } catch (e) {
      return Promise.reject<boolean>(e);
    }
  }
}
