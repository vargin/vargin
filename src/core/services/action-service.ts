/// <reference path="../../../typings/tsd.d.ts" />
import { IOverrides } from 'core/overrides/overrides';
import { IAction } from 'core/actions/action';

import { AlertAction } from 'core/actions/alert-action';
import { BroadcastAction } from 'core/actions/broadcast-action';
import { ChangePropertyAction } from 'core/actions/change-property-action';
import { NavigateAction } from 'core/actions/navigate-action';

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
