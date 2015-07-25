import { IProperty, Property } from 'core/property';
import { IAction } from 'core/actions/action';

const EVENTS = new Map<string, IProperty<Array<IAction>>>([
  ['change', new Property<Array<IAction>>('Change', null, 'change')],
  ['click', new Property<Array<IAction>>('Click', null, 'click')],
  ['hover', new Property<Array<IAction>>('Hover', null, 'hover')]
]);

export class EventService {
  static getDescriptor(type: string): IProperty<Array<IAction>> {
    if (!EVENTS.has(type)) {
      throw new Error('Type is not supported: ' + type);
    }

    return EVENTS.get(type);
  }
}