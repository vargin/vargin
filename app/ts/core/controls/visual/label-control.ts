/// <reference path="../../../../../typings/tsd.d.ts" />
import {
  VisualControl,
  IVisualControlParameters
} from 'core/controls/visual/visual-control';
import { OwnedPropertyWithOptions } from 'core/owned-property';
import {
    VisualControlMetadata
} from 'core/controls/visual/visual-control-metadata';
import { IProperty, Property } from 'core/property';
import { IAction } from 'core/actions/action';
import { StyleService } from 'services/style-service';
import { EventService } from 'services/event-service';

const SUPPORTED_PROPERTIES =  new Map<string, IProperty<string>>([
  ['text', new Property('Text', '[Label]')],
  ['title', new Property('Title', '[Label Title]')]
]);

const SUPPORTED_STYLES = new Map<string, IProperty<string>>([
  ['align-items', new OwnedPropertyWithOptions(
    null, StyleService.getDescriptor('align-items'), 'center'
  )],
  ['background-color', StyleService.getDescriptor('background-color')],
  ['color', StyleService.getDescriptor('color')],
  ['display', new OwnedPropertyWithOptions(
    null, StyleService.getDescriptor('display'), 'inline'
  )],
  ['flex-basis', StyleService.getDescriptor('flex-basis')],
  ['flex-grow', StyleService.getDescriptor('flex-grow')],
  ['flex-shrink', StyleService.getDescriptor('flex-shrink')],
  ['font-size', StyleService.getDescriptor('font-size')],
  ['justify-content', StyleService.getDescriptor('justify-content')],
  ['padding', StyleService.getDescriptor('padding')],
  ['text-decoration', StyleService.getDescriptor('text-decoration')]
]);

const SUPPORTED_EVENTS = new Map<string, IProperty<Array<IAction>>>([
  ['click', EventService.getDescriptor('click')],
  ['hover', EventService.getDescriptor('hover')]
]);

const METADATA = Object.freeze(new VisualControlMetadata(
  'label',
  'Label',
  'HTML Label',
  SUPPORTED_EVENTS,
  SUPPORTED_PROPERTIES,
  SUPPORTED_STYLES
));

export class LabelControl extends VisualControl {
  constructor(id: string, parameters?: IVisualControlParameters) {
    super(id, LabelControl.getMeta(), parameters);
  }

  get text() {
    return this._properties.get('text');
  }

  get title() {
    return this._properties.get('title');
  }

  static getMeta() {
    return METADATA;
  }
}
