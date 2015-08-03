import { Action } from 'core/actions/action';
import { Message } from 'core/events/message';
import { ChannelService } from 'services/channel-service';

export class BroadcastAction extends Action {
  constructor(properties: Map<string, string>) {
    super('Broadcast', 'broadcast-action', properties);

    ['channel', 'message-name', 'message-data'].forEach((parameterName) => {
      if (!properties.has(parameterName)) {
        throw new Error(
          'Parameter "' + parameterName + '" is expected, but not provided!'
        );
      }
    });
  }

  perform() {
    try {
      ChannelService.getChannel(this.properties.get('channel')).send(
        new Message(
          this.properties.get('message-name'),
          this.properties.get('message-data')
        )
      );
      return Promise.resolve(true);
    } catch(e) {
      return Promise.reject<boolean>(e);
    }
  }
}