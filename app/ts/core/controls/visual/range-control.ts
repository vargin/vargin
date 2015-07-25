/// <reference path="../../../../../typings/tsd.d.ts" />
import BaseVisualControl from 'core/controls/visual/base-visual-control';
import { ControlProperty } from 'core/controls/control-property';
import {
    VisualControlMetadata
} from 'core/controls/visual/visual-control-metadata';
import { IProperty, Property } from 'core/property';
import { IAction } from 'core/actions/action';
import { StyleService } from 'services/style-service';
import { EventService } from 'services/event-service';

const SUPPORTED_PROPERTIES = new Map<string, IProperty<string>>([
  ['min', new Property('Minimum', '0')],
  ['max', new Property('Maximum', '100')],
  ['step', new Property('Step', '1')],
  ['value', new Property('Value', '0')],
]);

const SUPPORTED_STYLES = new Map<string, IProperty<string>>([
  ['opacity', StyleService.getDescriptor('opacity')]
]);

const SUPPORTED_EVENTS = new Map<string, IProperty<Array<IAction>>>([
  ['change', EventService.getDescriptor('change')]
]);

const METADATA = Object.freeze(new VisualControlMetadata(
  'range',
  'Number Range',
  'Number Range',
  SUPPORTED_EVENTS,
  SUPPORTED_PROPERTIES,
  SUPPORTED_STYLES
));

export default class RangeControl extends BaseVisualControl {
  constructor(id, properties?, styles?, events?) {
    super(id, RangeControl.getMeta(), properties, styles, events);
  }

  get min() {
    return this._properties.get('min');
  }

  get max() {
    return this._properties.get('max');
  }

  get step() {
    return this._properties.get('step');
  }

  get value() {
    return this._properties.get('value');
  }

  static getMeta() {
    return METADATA;
  }
}
