import { Control } from '../control';
import { ControlMetadata } from '../control-metadata';
import { IProperty, Property, PropertyWithOptions } from '../../property';
import { StyleService } from '../../services/style-service';
import { EventService } from '../../services/event-service';
import { IOverrides } from '../../overrides/overrides';
import { Trigger } from '../../triggers/trigger';

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

const SUPPORTED_EVENTS = new Map<string, IProperty<string>>(
  <[string, IProperty<string>][]>[
    ['click', EventService.getDescriptor('click')],
    ['hover', EventService.getDescriptor('hover')]
  ]
);

const METADATA = Object.freeze(new ControlMetadata(
  'button',
  'Button',
  'HTML Button',
  SUPPORTED_EVENTS,
  SUPPORTED_PROPERTIES,
  SUPPORTED_STYLES
));

export class ButtonControl extends Control {
  constructor(id: string, overrides?: IOverrides, triggers?: Trigger[]) {
    super(id, ButtonControl.getMeta(), overrides, triggers);
  }

  static getMeta() {
    return METADATA;
  }
}
