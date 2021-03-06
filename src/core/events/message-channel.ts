import { IMessage } from '..//events/message';

export interface IMessageChannel {
  /**
   * Unique name of the message channel.
   * @type {string}
   */
  name: string;

  /**
   * Sends message to the channel.
   * @param {IMessage} message
   */
  send(message: IMessage): void;
}

export class MessageChannel implements IMessageChannel {
  private _name: string;

  get name() {
    return this._name;
  }

  constructor(name: string) {
    this._name = name;
  }

  send(message: IMessage) {
    throw new Error('Not implemented!');
  }
}
