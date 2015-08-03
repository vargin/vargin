import { Action } from 'core/actions/action';
import { ApplicationService } from 'services/application-service';

export class ChangePropertyAction<TPropertyValue> extends Action {
  constructor(properties: Map<string, string>) {
    super('Change Property', 'change-property-action', properties);

    ['control-id', 'property-name', 'property-value'].forEach(
      (parameterName) => {
        if (!properties.has(parameterName)) {
          throw new Error(
            'Parameter "' + parameterName + '" is expected, but not provided!'
          );
        }
      }
    );
  }

  perform() {
    try {
      var control = ApplicationService.findControlById(
        this.properties.get('control-id')
      );

      control[this.properties.get('property-name')].setValue(
        this.properties.get('property-value')
      );
      return Promise.resolve(true);
    } catch(e) {
      return Promise.reject<boolean>(e);
    }
  }
}
