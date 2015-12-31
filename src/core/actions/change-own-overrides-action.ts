import { Application } from '../application';
import { Control } from '../controls/control';
import { IProperty, Property } from '../property';
import { IOverrides } from '../overrides/overrides';
import { Action } from './action';
import { ActionMetadata } from './action-metadata';

const SUPPORTED_PROPERTIES = new Map<string, IProperty<string>>(
  <[string, IProperty<string>][]>[
    ['overrides-name', new Property('State', '')]
  ]
);

const METADATA = Object.freeze(new ActionMetadata(
  'change-own-overrides-action',
  'Change Own State',
  'Action that allows to change own control state',
  SUPPORTED_PROPERTIES
));

export class ChangeOwnOverridesAction extends Action {
  constructor(overrides?: IOverrides) {
    super(METADATA, overrides);
  }

  perform(application: Application, control: Control) {
    try {
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
