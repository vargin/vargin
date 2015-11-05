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
import { ControlState } from 'core/controls/control-state';

const SUPPORTED_PROPERTIES = new Map<string, IProperty<string>>(
  <[string, IProperty<string>][]>[
    ['placeholder', new Property('Placeholder', '[Placeholder]')],
    ['value', new Property('Value', '')],
  ]
);

const SUPPORTED_STYLES = new Map<string, IProperty<string>>(
  <[string, IProperty<string>][]>[
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
    ['font-weight', StyleService.getDescriptor('font-weight')],
    ['padding', StyleService.getDescriptor('padding')]
  ]
);

const SUPPORTED_EVENTS = new Map<string, IProperty<Array<IAction>>>(
  <[string, IProperty<Array<IAction>>][]>[
    ['change', EventService.getDescriptor('change')]
  ]
);

const METADATA = Object.freeze(new VisualControlMetadata(
  'text-input',
  'Text Input',
  'Text Input',
  SUPPORTED_EVENTS,
  SUPPORTED_PROPERTIES,
  SUPPORTED_STYLES
));

export class TextInputControl extends VisualControl {
  constructor(
    id: string, states?: ControlState[], parameters?: IVisualControlParameters
  ) {
    super(id, TextInputControl.getMeta(), states, parameters);
  }

  get placeholder() {
    return this.getProperty('placeholder');
  }

  get value() {
    return this.getProperty('value');
  }

  static getMeta() {
    return METADATA;
  }
}
