import { IAction } from 'core/actions/action';
import { ActionService } from 'core/services/action-service';
import { ICompiler } from 'compilers/compiler';

export interface IJSONAction {
  type: string;
  properties: [string, string][];
}

export class JSONActionCompiler implements ICompiler<IAction, IJSONAction> {
  compile(action: IAction): Promise<IJSONAction> {
    let properties: [string, string][] = [];
    action.properties.forEach((propertyValue, propertyKey) => {
      properties.push([propertyKey, propertyValue.getValue()]);
    });

    return Promise.resolve<IJSONAction>({
      type: action.type,
      properties: properties
    });
  }

  decompile(compiledAction: IJSONAction): Promise<IAction> {
    return Promise.resolve(
      ActionService.createByType(
        compiledAction.type, new Map<string, string>(compiledAction.properties)
      )
    );
  }
}
