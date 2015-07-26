import { Action } from 'core/actions/action';
import { IMessage } from 'core/events/message';
import { IMessageChannel } from 'core/events/message-channel';

export class BroadcastAction extends Action {
  private _channel: IMessageChannel;
  private _message: IMessage;

  constructor(channel: IMessageChannel, message: IMessage) {
    super('Broadcast', 'broadcast-action');

    this._channel = channel;
    this._message = message;
  }

  get channel() {
    return this._channel;
  }

  get message() {
    return this._message;
  }

  perform() {
    try {
      this._channel.send(this._message);
      return Promise.resolve(true);
    } catch(e) {
      return Promise.reject<boolean>(e);
    }
  }
}