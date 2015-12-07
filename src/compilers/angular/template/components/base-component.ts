import { Application } from '../../../../core/application';
import { Control } from '../../../../core/controls/control';
import { ServicesController } from '../services-controller';
import * as JSONAction from '../../../json/json-action-compiler';

export class BaseComponent {
  protected application: Application;
  private actionCompiler = new JSONAction.JSONActionCompiler();

  constructor(application: Application) {
    this.application = application;
  }

  getControl(controlId: string): Control {
    throw new Error('Not Implemented');
  };

  generateCssClasses(controlId: string) {
    let control = this.getControl(controlId);

    let cssClasses = [];

    let overrides = control.overrides;
    while (overrides && overrides.name !== '__predefined__') {
      cssClasses.push(`vargin-${controlId}--${overrides.name}`);
      overrides = overrides.parent;
    }

    return cssClasses.join(' ');
  }

  onControlAction(controlId: string, eventName: string) {
    let control = this.getControl(controlId);

    let eventProperty = control.getEvent(eventName);
    let propertyValue = eventProperty && eventProperty.getValue();
    if (propertyValue) {
      (<JSONAction.IJSONAction[]>JSON.parse(propertyValue)).forEach(
        (jsonAction) => {
          this.actionCompiler.decompile(jsonAction).then((action) => {
            action.perform(this.application);
          });
        }
      );
    }
  }

  getDatasource(id: string) {
    return ServicesController.getDatasource(id);
  }
}
