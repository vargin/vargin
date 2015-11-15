import { IAction } from '../../core/actions/action';
import { ActionService } from '../../core/services/action-service';
import { ICompiler } from '../compiler';

import * as JSONOverrides from './json-overrides-compiler';

export interface IJSONAction {
  type: string;
  overrides: JSONOverrides.IJSONOverrides;
}

export class JSONActionCompiler implements ICompiler<IAction, IJSONAction> {
  private _overridesCompiler = new JSONOverrides.JSONOverridesCompiler();

  compile(action: IAction): Promise<IJSONAction> {
    return this._overridesCompiler.compile(action.overrides).then(
      (jsonOverrides) => {
        return { type: action.meta.type, overrides: jsonOverrides };
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
