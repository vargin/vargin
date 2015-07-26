export interface IAction {
  name: string;
  type: string;

  perform(): Promise<boolean>;
}

export class Action implements IAction {
  private _name: string;
  private _type: string;

  constructor(name: string, type: string) {
    this._name = name;
    this._type = type;
  }

  get name() {
    return this._name;
  }

  get type() {
    return this._type;
  }

  perform() {
    return Promise.reject<boolean>(new Error('Not Implemented!'));
  }
}