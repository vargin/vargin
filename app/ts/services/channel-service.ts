import { IMessageChannel, MessageChannel } from 'core/events/message-channel';

export class ChannelService {
  private static _channels: Map<string, IMessageChannel>;

  static getChannel(channelName: string) {
    return ChannelService._channels.get(channelName);
  }

  static create(channelName: string) {
    if (ChannelService._channels.has(channelName)) {
      throw new Error('Channel "' + channelName + '" already exists.');
    }

    let channel = new MessageChannel(channelName);
    ChannelService._channels.set(channelName, channel);

    return channel;
  }
}
