import { IProperty } from 'core/property';
import { Control } from 'core/controls/control';
import { IControlCompiler } from 'compilers/control-compiler';
import {
  IJSONAction,
  JSONActionCompiler
} from 'compilers/json/json-action-compiler';

export interface ISerializedServiceControl {
  type: string;
  id: string;
  parameters?: {
    properties?: [string, string][];
    events?: [string, Array<IJSONAction>][];
  };
}

let actionCompiler = new JSONActionCompiler();

export class ServiceControlCompiler implements IControlCompiler<ISerializedServiceControl> {
  compile(control: Control) {
    return Promise.all<any>([
      ServiceControlCompiler.compileProperties(control),
      ServiceControlCompiler.compileEvents(control)
    ]).then<ISerializedServiceControl>(([properties, events]) => {
      return <ISerializedServiceControl>{
        id: control.id,
        type: control.meta.type,
        parameters: { properties, events }
      };
    });
  }

  decompile(compiledControl: ISerializedServiceControl): Promise<Control> {
    throw new Error('Not Implemented!');
  }

  private static compileProperties(control: Control): Promise<[string, string][]> {
    let properties = [];
    control.meta.properties.forEach((property, propertyKey) => {
      properties.push([
        propertyKey, control.getProperty(propertyKey).getValue()
      ]);
    });

    return Promise.resolve(properties);
  }

  private static compileEvents(control: Control): Promise<[string, IJSONAction[]][]> {
    let actionCompilePromises = [];
    let events = [];

    control.meta.events.forEach((eventProperty, eventKey) => {
      let actions = control.getEvent(eventKey).getValue();

      if (actions) {
        actionCompilePromises.push(
          Promise.all(
            actions.map((action) => actionCompiler.compile(action))
          ).then(
            (compiledActions) => events.push([eventKey, compiledActions])
          )
        );
      }
    });

    return Promise.all(actionCompilePromises).then(() => events);
  }
}
