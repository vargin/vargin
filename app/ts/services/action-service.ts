/// <reference path="../../../typings/tsd.d.ts" />
import { IAction } from 'core/actions/action';

import { AlertAction } from 'core/actions/alert-action';
import { BroadcastAction } from 'core/actions/broadcast-action';
import { ChangePropertyAction } from 'core/actions/change-property-action';

const ACTIONS = new Map<string, any>([
  ['alert-action', AlertAction],
  ['broadcast-action', BroadcastAction],
  ['change-property-action', ChangePropertyAction]
]);

export class ActionService {
  static createByType<TAction extends IAction>(
    type: string,
    properties: Map<string, string>
  ): TAction {
    if (!ACTIONS.has(type)) {
      throw new Error('Not supported action type: ' + type);
    }

    let ActionClass = <{ new(properties: Map<string, string>): TAction; }>
      ACTIONS.get(type);

    return new ActionClass(properties);
  }
}
