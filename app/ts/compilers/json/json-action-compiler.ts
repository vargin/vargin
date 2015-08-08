import { IAction } from 'core/actions/action';
import { ActionService } from 'services/action-service';
import { ICompiler } from 'compilers/compiler';

export interface IJSONAction {
  type: string;
  properties: Iterable<[string, string]>;
}

export class JSONActionCompiler implements ICompiler<IAction, IJSONAction> {
  compile(action: IAction) {
    var properties = [];
    action.properties.forEach((propertyValue, propertyKey) => {
      properties.push([propertyKey, propertyValue]);
    });

    return {
      type: action.type,
      properties: properties
    };
  }

  decompile(compiledAction: IJSONAction) {
    return ActionService.createByType(
      compiledAction.type, new Map(compiledAction.properties)
    );
  }
}
