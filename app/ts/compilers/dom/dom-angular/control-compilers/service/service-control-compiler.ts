import { IProperty } from 'core/property';
import { Control } from 'core/controls/control';
import { IControlCompiler } from 'compilers/control-compiler';
import {
  ISerializedServiceControlAction,
  SerializedServiceControlActionCompiler
} from 'compilers/dom/dom-angular/control-compilers/service/service-control-action-compiler';

export interface ISerializedServiceControl {
  type: string;
  id: string;
  parameters?: {
    properties?: Iterable<[string, string]>;
    events?: Iterable<[string, Array<ISerializedServiceControlAction>]>;
  };
}

export class ServiceControlCompiler implements IControlCompiler<ISerializedServiceControl> {
  private _actionCompiler = new SerializedServiceControlActionCompiler();

  compile(control: Control) {
    let parameters = <{
      properties: [string, string][],
      events: [string, ISerializedServiceControlAction[]][]
    }>{ properties: [], events: [] };

    control.meta.supportedProperties.forEach((property, propertyKey) => {
      parameters.properties.push([
        propertyKey, (<IProperty<string>>control[propertyKey]).getValue()
      ]);
    });

    control.meta.supportedEvents.forEach((eventProperty, eventKey) => {
      let actions = control.events.get(eventKey).getValue();

      if (actions.length) {
        parameters.events.push([
          eventKey,
          actions.map((action) => this._actionCompiler.compile(action))
        ]);
      }
    });

    return {
      id: control.id,
      type: control.meta.type,
      parameters: parameters
    };
  }

  decompile(compiledControl: ISerializedServiceControl): Control {
    throw new Error('Not Implemented!');
  }
}
