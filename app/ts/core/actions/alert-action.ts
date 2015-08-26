import { IProperty, Property } from 'core/property';
import { Action } from 'core/actions/action';
import { ActionMetadata } from 'core/actions/action-metadata';

const SUPPORTED_PROPERTIES = new Map<string, IProperty<string>>([
  ['alert-message', new Property('Alert message', '')]
]);

const METADATA = Object.freeze(new ActionMetadata(
  'alert-action',
  'Alert',
  'Action that allows to alert any message',
  SUPPORTED_PROPERTIES
));

export class AlertAction extends Action {
  constructor(properties?: Map<string, string>) {
    super(METADATA, properties);
  }

  perform() {
    try {
      alert(this.properties.get('alert-message').getValue());
      return Promise.resolve(true);
    } catch(e) {
      return Promise.reject<boolean>(e);
    }
  }
}
