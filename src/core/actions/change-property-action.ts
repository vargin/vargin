import { Application } from '../application';
import { IProperty, Property } from '../property';
import { IOverrides } from '../overrides/overrides';
import { Action } from './action';
import { ActionMetadata } from './action-metadata';

const SUPPORTED_PROPERTIES = new Map<string, IProperty<string>>(
  <[string, IProperty<string>][]>[
    ['control-id', new Property('Control', '', 'control')],
    ['property-name', new Property('Property Name', '')],
    ['property-value', new Property('Property Value', '')]
  ]
);

const METADATA = Object.freeze(new ActionMetadata(
  'change-property-action',
  'Change Property',
  'Action that allows to change any property of any control',
  SUPPORTED_PROPERTIES
));

export class ChangePropertyAction extends Action {
  constructor(overrides?: IOverrides) {
    super(METADATA, overrides);
  }

  perform(application: Application) {
    try {
      let control = application.findControl(
        this.getProperty('control-id').getValue()
      );

      control.getProperty(
        this.getProperty('property-name').getValue()
      ).setValue(
        this.getProperty('property-value').getValue()
      );
      return Promise.resolve(true);
    } catch (e) {
      return Promise.reject<boolean>(e);
    }
  }
}
