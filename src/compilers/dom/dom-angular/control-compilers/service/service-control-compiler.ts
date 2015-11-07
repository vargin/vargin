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
    properties?: [string, string][];
    events?: [string, Array<ISerializedServiceControlAction>][];
  };
}

const actionCompiler = new SerializedServiceControlActionCompiler();

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

  private static compileEvents(control: Control): Promise<[string, ISerializedServiceControlAction[]][]> {
    let actionCompilePromises = [];
    let events = [];

    control.meta.events.forEach((eventProperty, eventKey) => {
      actionCompilePromises.push(
        Promise.all(
          control.events.get(eventKey).getValue().map(
            (action) => actionCompiler.compile(action)
          )
        ).then(
          (compiledActions) => events.push([eventKey, compiledActions])
        )
      );
    });

    return Promise.all(actionCompilePromises).then(() => events);
  }
}
