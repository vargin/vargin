/// <reference path="../../../typings/tsd.d.ts" />
import { EventEmitter } from 'angular2/angular2';

import { IAction } from 'core/actions/action';

import { BroadcastAction } from 'core/actions/broadcast-action';
import { ChangePropertyAction } from 'core/actions/change-property-action';

const ACTIONS = new Map<string, any>([
  ['broadcast-action', BroadcastAction],
  ['change-property-action', ChangePropertyAction]
]);

export class ActionService {
  static actionSelected: EventEmitter = new EventEmitter();

  static createByType<TAction extends IAction>(
    type: string,
    properties: Map<string, string>
  ): TAction {
    if (!ACTIONS.has(type)) {
      throw new Error('Not supported action type: ' + type);
    }

    var ActionClass = <{ new(properties: Map<string, string>): TAction; }>
      ACTIONS.get(type);

    return new ActionClass(properties);
  }

  static selectAction(action: IAction) {
    ActionService.actionSelected.next(action);
  }
}
