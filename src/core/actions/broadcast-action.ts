import { IProperty, Property } from 'core/property';
import { Action } from 'core/actions/action';
import { ActionMetadata } from 'core/actions/action-metadata';
import { Message } from 'core/events/message';
import { ChannelService } from 'core/services/channel-service';

const SUPPORTED_PROPERTIES = new Map<string, IProperty<string>>([
  ['channel', new Property('Channel Name', '')],
  ['message-name', new Property('Message Name', '')],
  ['message-data', new Property('Message Data', '')],
]);

const METADATA = Object.freeze(new ActionMetadata(
  'broadcast-action',
  'Broadcast',
  'Action that allows to broadcast arbitrary data to any message channel',
  SUPPORTED_PROPERTIES
));

export class BroadcastAction extends Action {
  constructor(properties: Map<string, string>) {
    super(METADATA, properties);
  }

  perform() {
    try {
      ChannelService.getChannel(this.properties.get('channel').getValue()).send(
        new Message(
          this.properties.get('message-name').getValue(),
          this.properties.get('message-data').getValue()
        )
      );
      return Promise.resolve(true);
    } catch (e) {
      return Promise.reject<boolean>(e);
    }
  }
}
