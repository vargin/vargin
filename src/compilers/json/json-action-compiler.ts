import { IAction } from 'core/actions/action';
import { ActionService } from 'core/services/action-service';
import { ICompiler } from 'compilers/compiler';
import {
  IJSONOverrides,
  JSONOverridesCompiler
} from 'compilers/json/json-overrides-compiler';

export interface IJSONAction {
  type: string;
  overrides: IJSONOverrides;
}

export class JSONActionCompiler implements ICompiler<IAction, IJSONAction> {
  private _overridesCompiler: JSONOverridesCompiler = new JSONOverridesCompiler();

  compile(action: IAction): Promise<IJSONAction> {
    return this._overridesCompiler.compile(action.overrides).then(
      (jsonOverrides) => {
        return { type: action.type, overrides: jsonOverrides };
      }
    );
  }

  decompile(compiledAction: IJSONAction): Promise<IAction> {
    return this._overridesCompiler.decompile(compiledAction.overrides).then(
      (overrides) => {
        return ActionService.createByType(compiledAction.type, overrides);
      }
    );
  }
}
