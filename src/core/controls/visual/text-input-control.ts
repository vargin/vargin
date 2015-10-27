/// <reference path="../../../../typings/tsd.d.ts" />
import {
  VisualControl,
  IVisualControlParameters
} from 'core/controls/visual/visual-control';
import { OwnedProperty } from 'core/owned-property';
import {
    VisualControlMetadata
} from 'core/controls/visual/visual-control-metadata';
import { IProperty, Property } from 'core/property';
import { IAction } from 'core/actions/action';
import { StyleService } from 'core/services/style-service';
import { EventService } from 'core/services/event-service';

const SUPPORTED_PROPERTIES = new Map<string, IProperty<string>>([
  ['placeholder', new Property('Placeholder', '[Placeholder]')],
  ['value', new Property('Value', '')],
]);

const SUPPORTED_STYLES = new Map<string, IProperty<string>>([
  ['background-color', StyleService.getDescriptor('background-color')],
  [
    'border',
    new OwnedProperty(
      null, StyleService.getDescriptor('border'), '0.1rem solid #c7c7c7'
    )
  ],
  ['color', StyleService.getDescriptor('color')],
  ['flex-basis', StyleService.getDescriptor('flex-basis')],
  ['flex-grow', StyleService.getDescriptor('flex-grow')],
  ['flex-shrink', StyleService.getDescriptor('flex-shrink')],
  ['font-size', StyleService.getDescriptor('font-size')],
  ['padding', StyleService.getDescriptor('padding')]
]);

const SUPPORTED_EVENTS = new Map<string, IProperty<Array<IAction>>>([
  ['change', EventService.getDescriptor('change')]
]);

const METADATA = Object.freeze(new VisualControlMetadata(
  'text-input',
  'Text Input',
  'Text Input',
  SUPPORTED_EVENTS,
  SUPPORTED_PROPERTIES,
  SUPPORTED_STYLES
));

export class TextInputControl extends VisualControl {
  constructor(id: string, parameters?: IVisualControlParameters) {
    super(id, TextInputControl.getMeta(), parameters);
  }

  get placeholder() {
    return this._properties.get('placeholder');
  }

  get value() {
    return this._properties.get('value');
  }

  static getMeta() {
    return METADATA;
  }
}