import { IProperty, Property } from 'core/property';
import { Action } from 'core/actions/action';
import { ActionMetadata } from 'core/actions/action-metadata';
import { ApplicationService } from 'core/services/application-service';

const SUPPORTED_PROPERTIES = new Map<string, IProperty<string>>([
  ['control-id', new Property('Control', '', 'control')],
  ['property-name', new Property('Property Name', '')],
  ['property-value', new Property('Property Value', '')],
]);

const METADATA = Object.freeze(new ActionMetadata(
  'change-property-action',
  'Change Property',
  'Action that allows to change any property of any control',
  SUPPORTED_PROPERTIES
));

export class ChangePropertyAction extends Action {
  constructor(properties?: Map<string, string>) {
    super(METADATA, properties);
  }

  perform() {
    try {
      let control = ApplicationService.findControlById(
        this.properties.get('control-id').getValue()
      );

      control[this.properties.get('property-name').getValue()].setValue(
        this.properties.get('property-value').getValue()
      );
      return Promise.resolve(true);
    } catch (e) {
      return Promise.reject<boolean>(e);
    }
  }
}
