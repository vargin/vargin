import { IProperty, Property } from '../property';
import { IOverrides } from '../overrides/overrides';
import { Action } from './action';
import { ActionMetadata } from './action-metadata';
import { ApplicationService } from '../services/application-service';

const SUPPORTED_PROPERTIES = new Map<string, IProperty<string>>(
  <[string, IProperty<string>][]>[
    ['control-id', new Property('Control', '', 'control')],
    ['overrides-id', new Property('State', '')]
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

  perform() {
    try {
      let control = ApplicationService.findControlById(
        this.getProperty('control-id').getValue()
      );

      let rootOverrides = control.overrides.getRoot();
      let targetOverrideId = this.getProperty('overrides-id').getValue();

      let targetOverrides = rootOverrides.id === targetOverrideId ?
        rootOverrides : rootOverrides.find(targetOverrideId);

      if (targetOverrides) {
        control.overrides = targetOverrides;
      }

      return Promise.resolve(true);
    } catch (e) {
      return Promise.reject<boolean>(e);
    }
  }
}
