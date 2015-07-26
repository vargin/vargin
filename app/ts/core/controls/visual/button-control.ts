/// <reference path="../../../../../typings/tsd.d.ts" />
import BaseVisualControl from 'core/controls/visual/base-visual-control';
import { ControlProperty } from 'core/controls/control-property';
import {
  VisualControlMetadata
} from 'core/controls/visual/visual-control-metadata';
import { IProperty, Property, PropertyWithOptions } from 'core/property';
import { StyleService } from 'services/style-service';
import { EventService } from 'services/event-service';
import { IAction, Action } from 'core/actions/action';
import { BroadcastAction } from 'core/actions/broadcast-action';

const SUPPORTED_PROPERTIES = new Map<string, IProperty<string>>([
  ['text', new Property('Text', '[Text]')],
  ['title', new Property('Title', '[Title]')],
  ['type', new PropertyWithOptions('Type', [
    new Property('Submit', 'submit'),
    new Property('Reset', 'reset'),
    new Property('Button', 'button')
  ])]
]);

const SUPPORTED_STYLES = new Map<string, IProperty<string>>([
  ['color', StyleService.getDescriptor('color')],
  [
    'background-color',
    new ControlProperty(
      StyleService.getDescriptor('background-color'), '#333333'
    )
  ],
  ['border', StyleService.getDescriptor('border')]
]);

const SUPPORTED_EVENTS = new Map<string, IProperty<Array<IAction>>>([
  ['click', EventService.getDescriptor('click')],
  ['hover', EventService.getDescriptor('hover')]
]);

const METADATA = Object.freeze(new VisualControlMetadata(
  'button',
  'Button',
  'HTML Button',
  SUPPORTED_EVENTS,
  SUPPORTED_PROPERTIES,
  SUPPORTED_STYLES
));

export default class ButtonControl extends BaseVisualControl {
  constructor(id, properties?, styles?, events?) {
    super(id, ButtonControl.getMeta(), properties, styles, events);
  }

  get text() {
    return this._properties.get('text');
  }

  get title() {
    return this._properties.get('title');
  }

  get type() {
    return this._properties.get('type');
  }

  static getMeta() {
    return METADATA;
  }
}
