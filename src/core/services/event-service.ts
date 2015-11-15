import { IProperty, Property } from '../property';

const EVENTS = new Map<string, IProperty<string>>(
  <[string, IProperty<string>][]>[
    ['change', new Property<string>('Change', null, 'change')],
    ['click', new Property<string>('Click', null, 'click')],
    ['item-click', new Property<string>('Item click', null, 'item-click')],
    ['hover', new Property<string>('Hover', null, 'hover')]
  ]
);

export class EventService {
  static getDescriptor(type: string): IProperty<string> {
    if (!EVENTS.has(type)) {
      throw new Error('Type is not supported: ' + type);
    }

    return EVENTS.get(type);
  }
}
