import { IAction } from '../actions/action';

export class Trigger {
  name: string;
  condition: string;
  actions: IAction[];

  constructor(name: string, condition: string, actions: IAction[] = []) {
    this.name = name;
    this.condition = condition;
    this.actions = actions;
  }
}
