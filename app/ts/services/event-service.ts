import { IPropertyDescriptor, PropertyDescriptor } from 'core/property';

const EVENTS = new Map<string, IPropertyDescriptor>([
  ['click', new PropertyDescriptor('Click', 'click')],
  ['hover', new PropertyDescriptor('Hover', 'hover')]
]);

export class EventService {
  static getDescriptor(type: string): IPropertyDescriptor {
    if (!EVENTS.has(type)) {
      throw new Error('Type is not supported: ' + type);
    }

    return EVENTS.get(type);
  }
}