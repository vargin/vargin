import { IProperty, Property } from '../property';
import { IOverrides } from '../overrides/overrides';
import { Action } from './action';
import { ActionMetadata } from './action-metadata';
import { Message } from '../events/message';
import { ChannelService } from '../services/channel-service';

const SUPPORTED_PROPERTIES = new Map<string, IProperty<string>>(
  <[string, IProperty<string>][]>[
    ['channel', new Property('Channel Name', '')],
    ['message-name', new Property('Message Name', '')],
    ['message-data', new Property('Message Data', '')],
  ]
);

const METADATA = Object.freeze(new ActionMetadata(
  'broadcast-action',
  'Broadcast',
  'Action that allows to broadcast arbitrary data to any message channel',
  SUPPORTED_PROPERTIES
));

export class BroadcastAction extends Action {
  constructor(overrides?: IOverrides) {
    super(METADATA, overrides);
  }

  perform() {
    try {
      ChannelService.getChannel(this.getProperty('channel').getValue()).send(
        new Message(
          this.getProperty('message-name').getValue(),
          this.getProperty('message-data').getValue()
        )
      );
      return Promise.resolve(true);
    } catch (e) {
      return Promise.reject<boolean>(e);
    }
  }
}
