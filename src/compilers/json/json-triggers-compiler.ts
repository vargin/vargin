import { Trigger } from '../../core/triggers/trigger';
import { IJSONAction, JSONActionCompiler } from './json-action-compiler';
import { ICompiler } from '../compiler';

export interface IJSONTrigger {
  name: string;
  condition: string;
  actions: IJSONAction[];
}

export class JSONTriggerCompiler implements ICompiler<Trigger, IJSONTrigger> {
  private actionCompiler = new JSONActionCompiler();

  compile(trigger: Trigger): Promise<IJSONTrigger> {
    return Promise.all(
      trigger.actions.map((action) => this.actionCompiler.compile(action))
    ).then((compiledActions) => {
      return {
        name: trigger.name,
        condition: trigger.condition,
        actions: compiledActions
      };
    });
  }

  decompile(compiledTrigger: IJSONTrigger): Promise<Trigger> {
    return Promise.all(
      compiledTrigger.actions.map(
        (action) => this.actionCompiler.decompile(action)
      )
    ).then((actions) => {
      return new Trigger(
        compiledTrigger.name, compiledTrigger.condition, actions
      );
    });
  }
}
