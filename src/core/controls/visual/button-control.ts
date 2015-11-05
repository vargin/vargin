/// <reference path="../../../../typings/tsd.d.ts" />
import {
  VisualControl,
  IVisualControlParameters
} from 'core/controls/visual/visual-control';
import {
  VisualControlMetadata
} from 'core/controls/visual/visual-control-metadata';
import { IProperty, Property, PropertyWithOptions } from 'core/property';
import { StyleService } from 'core/services/style-service';
import { EventService } from 'core/services/event-service';
import { IAction } from 'core/actions/action';
import { ControlState } from 'core/controls/control-state';

const SUPPORTED_PROPERTIES = new Map<string, IProperty<string>>(
  <[string, IProperty<string>][]>[
    ['text', new Property('Text', '[Button]')],
    ['title', new Property('Title', '[Button Title]')],
    ['type', new PropertyWithOptions('Type', [
      new Property('Submit', 'submit'),
      new Property('Reset', 'reset'),
      new Property('Button', 'button')
    ])]
  ]
);

const SUPPORTED_STYLES = new Map<string, IProperty<string>>(
  <[string, IProperty<string>][]>[
    ['background-color', StyleService.getDescriptor('background-color')],
    ['background-image', StyleService.getDescriptor('background-image')],
    ['background-position', StyleService.getDescriptor('background-position')],
    ['background-repeat', StyleService.getDescriptor('background-repeat')],
    ['background-size', StyleService.getDescriptor('background-size')],
    ['border', StyleService.getDescriptor('border')],
    ['border-radius', StyleService.getDescriptor('border-radius')],
    ['color', StyleService.getDescriptor('color')],
    ['flex-basis', StyleService.getDescriptor('flex-basis')],
    ['flex-grow', StyleService.getDescriptor('flex-grow')],
    ['flex-shrink', StyleService.getDescriptor('flex-shrink')],
    ['font-size', StyleService.getDescriptor('font-size')],
    ['font-weight', StyleService.getDescriptor('font-weight')],
    ['height', StyleService.getDescriptor('height')],
    ['line-height', StyleService.getDescriptor('line-height')],
    ['padding', StyleService.getDescriptor('padding')]
  ]
);

const SUPPORTED_EVENTS = new Map<string, IProperty<Array<IAction>>>(
  <[string, IProperty<Array<IAction>>][]>[
    ['click', EventService.getDescriptor('click')],
    ['hover', EventService.getDescriptor('hover')]
  ]
);

const METADATA = Object.freeze(new VisualControlMetadata(
  'button',
  'Button',
  'HTML Button',
  SUPPORTED_EVENTS,
  SUPPORTED_PROPERTIES,
  SUPPORTED_STYLES
));

export class ButtonControl extends VisualControl {
  constructor(id: string, states?: ControlState[], parameters?: IVisualControlParameters) {
    super(id, ButtonControl.getMeta(), states, parameters);
  }

  get text() {
    return this.getProperty('text');
  }

  get title() {
    return this.getProperty('title');
  }

  get type() {
    return this.getProperty('type');
  }

  static getMeta() {
    return METADATA;
  }
}
