import { IMessageChannel } from 'core/events/message-channel';

export interface IMessage {
  /**
   * Message channel message belongs to.
   * @type {IMessageChannel}
   */
  channel: IMessageChannel;

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
  private _channel: IMessageChannel;
  private _name: string;
  private _data: any;

  constructor(channel: IMessageChannel, name: string, data: any = null) {
    this._channel = channel;
    this._name = name;
    this._data = data;
  }

  get channel() {
    return this._channel;
  }

  get name() {
    return this._name;
  }

  get data() {
    return this._data;
  }
}