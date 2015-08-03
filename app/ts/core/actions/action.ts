export interface IAction {
  name: string;
  type: string;
  properties: Map<string, string>;

  perform(): Promise<boolean>;
}

export class Action implements IAction {
  private _name: string;
  private _type: string;
  private _properties: Map<string, string>;

  constructor(name: string, type: string, properties: Map<string, string>) {
    if (!properties) {
      throw new Error('Properties should be defined!');
    }

    this._name = name;
    this._type = type;
    this._properties = properties;
  }

  get name() {
    return this._name;
  }

  get type() {
    return this._type;
  }

  get properties() {
    return this._properties;
  }

  perform() {
    return Promise.reject<boolean>(new Error('Not Implemented!'));
  }
}