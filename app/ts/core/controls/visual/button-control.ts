/// <reference path="../../../../../typings/tsd.d.ts" />
import { VisualControl } from 'core/controls/visual/visual-control';
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
  [
    'background-color',
    new ControlProperty(
      StyleService.getDescriptor('background-color'), '#333333'
    )
  ],
  ['border', StyleService.getDescriptor('border')],
  ['color', StyleService.getDescriptor('color')],
  ['flex-basis', StyleService.getDescriptor('flex-basis')],
  ['flex-grow', StyleService.getDescriptor('flex-grow')],
  ['flex-shrink', StyleService.getDescriptor('flex-shrink')]
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

export class ButtonControl extends VisualControl {
  constructor(id, parameters?) {
    super(id, ButtonControl.getMeta(), parameters);
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
