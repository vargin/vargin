import { IOverrides } from '../overrides/overrides';
import { IAction } from '../actions/action';

import { AlertAction } from '../actions/alert-action';
import { BroadcastAction } from '../actions/broadcast-action';
import { ChangePropertyAction } from '../actions/change-property-action';
import { NavigateAction } from '../actions/navigate-action';

const ACTIONS = new Map<string, any>(<[string, any][]>[
  ['alert-action', AlertAction],
  ['broadcast-action', BroadcastAction],
  ['change-property-action', ChangePropertyAction],
  ['navigate-action', NavigateAction]
]);

export class ActionService {
  static createByType<TAction extends IAction>(
    type: string, overrides: IOverrides
  ): TAction {
    if (!ACTIONS.has(type)) {
      throw new Error('Not supported action type: ' + type);
    }

    let ActionClass = <{ new(overrides: IOverrides): TAction; }>
      ACTIONS.get(type);

    return new ActionClass(overrides);
  }
}
