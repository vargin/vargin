import { IAction } from 'core/actions/action';
import { ActionService } from 'services/action-service';
import { ICompiler } from 'compilers/compiler';

export interface ISerializedServiceControlAction {
  type: string;
  properties: Iterable<[string, string]>;
}

export class SerializedServiceControlActionCompiler implements ICompiler<IAction, ISerializedServiceControlAction> {
  compile(action: IAction) {
    let properties: [string, string][] = [];
    action.properties.forEach((propertyValue, propertyKey) => {
      properties.push([propertyKey, propertyValue.getValue()]);
    });

    return Promise.resolve({
      type: action.type,
      properties: properties
    });
  }

  decompile(compiledAction: ISerializedServiceControlAction) {
    return Promise.resolve(
      ActionService.createByType(
        compiledAction.type, new Map<string, string>(compiledAction.properties)
      )
    );
  }
}
