export interface IMessage {
  /**
   * Name of the message.
   * @type {string}
   */
  name: string;

  /**
   * Optional data to be passed with message.
   * @type {*}
   */
  data: any;
}

export class Message implements IMessage {
  private _name: string;
  private _data: any;

  constructor(name: string, data: any = null) {
    this._name = name;
    this._data = data;
  }

  get name() {
    return this._name;
  }

  get data() {
    return this._data;
  }
}