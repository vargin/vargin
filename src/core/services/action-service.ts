import { IOverrides } from '../overrides/overrides';

import { IAction } from '../actions/action';
import { AlertAction } from '../actions/alert-action';
import { BroadcastAction } from '../actions/broadcast-action';
import { ChangePropertyAction } from '../actions/change-property-action';
import { ChangeOverridesAction } from '../actions/change-overrides-action';
import {
  ChangeOwnOverridesAction
} from '../actions/change-own-overrides-action';
import { NavigateAction } from '../actions/navigate-action';

export class ActionService {
  static ACTIONS = new Map<string, any>(<[string, any][]>[
    ['alert-action', AlertAction],
    ['broadcast-action', BroadcastAction],
    ['change-property-action', ChangePropertyAction],
    ['change-overrides-action', ChangeOverridesAction],
    ['change-own-overrides-action', ChangeOwnOverridesAction],
    ['navigate-action', NavigateAction]
  ]);

  static createByType<TAction extends IAction>(
    type: string, overrides?: IOverrides
  ): TAction {
    if (!ActionService.ACTIONS.has(type)) {
      throw new Error('Not supported action type: ' + type);
    }

    let ActionClass = <{ new(overrides?: IOverrides): TAction; }>
      ActionService.ACTIONS.get(type);

    return new ActionClass(overrides);
  }

  static clone<TAction extends IAction>(action: TAction): TAction {
    return ActionService.createByType<TAction>(
      action.meta.type, action.overrides.clone()
    );
  }
}
