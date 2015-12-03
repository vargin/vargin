import { Application } from '../application';
import { IProperty, Property } from '../property';
import { IOverrides } from '../overrides/overrides';
import { Action } from './action';
import { ActionMetadata } from './action-metadata';

const SUPPORTED_PROPERTIES = new Map<string, IProperty<string>>(
  <[string, IProperty<string>][]>[
    ['control-id', new Property('Control', '', 'control')],
    ['overrides-name', new Property('State', '')]
  ]
);

const METADATA = Object.freeze(new ActionMetadata(
  'change-overrides-action',
  'Change State',
  'Action that allows to change property state',
  SUPPORTED_PROPERTIES
));

export class ChangeOverridesAction extends Action {
  constructor(overrides?: IOverrides) {
    super(METADATA, overrides);
  }

  perform(application: Application) {
    try {
      let control = application.findControl(
        this.getProperty('control-id').getValue()
      );

      let rootOverrides = control.overrides.getRoot();
      let targetOverridesName = this.getProperty('overrides-name').getValue();

      let targetOverrides = rootOverrides.name === targetOverridesName ?
        rootOverrides : rootOverrides.find(targetOverridesName);

      if (targetOverrides) {
        control.overrides = targetOverrides;
      }

      return Promise.resolve(true);
    } catch (e) {
      return Promise.reject<boolean>(e);
    }
  }
}
