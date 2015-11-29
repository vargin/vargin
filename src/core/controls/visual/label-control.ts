import { Control } from '../control';
import { ControlMetadata } from '../control-metadata';
import { IProperty, Property, PropertyWithOptions } from '../../property';
import { StyleService } from '../../services/style-service';
import { EventService } from '../../services/event-service';
import { StringFormatType } from '../../tools/string-formatter';
import { IOverrides, Overrides } from '../../overrides/overrides';
import { Trigger } from '../../triggers/trigger';

const PREDEFINED_OVERRIDES = new Map(<[string, Map<string, string>][]>[
  ['styles', new Map(<[string, string][]>[
    ['align-items', 'center'],
    ['display', 'inline']
  ])]
]);

const SUPPORTED_PROPERTIES = new Map<string, IProperty<string>>(
  <[string, IProperty<string>][]>[
    ['text', new Property('Text', '[Label]')],
    ['title', new Property('Title', '[Label Title]')],
    ['format', new PropertyWithOptions('Format', [
      new Property('Plain Text', StringFormatType.PlainText.toString()),
      new Property('Number', StringFormatType.Number.toString()),
      new Property('Percent', StringFormatType.Percent.toString()),
      new Property('Currency', StringFormatType.Currency.toString()),
      new Property('Short Time', StringFormatType.ShortTime.toString()),
      new Property('Short Date', StringFormatType.ShortDate.toString())
    ])]
  ]
);

const SUPPORTED_STYLES = new Map<string, IProperty<string>>(
  <[string, IProperty<string>][]>[
    ['align-items', StyleService.getDescriptor('align-items')],
    ['background-color', StyleService.getDescriptor('background-color')],
    ['color', StyleService.getDescriptor('color')],
    ['display', StyleService.getDescriptor('display')],
    ['flex-basis', StyleService.getDescriptor('flex-basis')],
    ['flex-grow', StyleService.getDescriptor('flex-grow')],
    ['flex-shrink', StyleService.getDescriptor('flex-shrink')],
    ['font-size', StyleService.getDescriptor('font-size')],
    ['font-weight', StyleService.getDescriptor('font-weight')],
    ['justify-content', StyleService.getDescriptor('justify-content')],
    ['margin', StyleService.getDescriptor('margin')],
    ['padding', StyleService.getDescriptor('padding')],
    ['text-decoration', StyleService.getDescriptor('text-decoration')]
  ]
);

const SUPPORTED_EVENTS = new Map<string, IProperty<string>>(
  <[string, IProperty<string>][]>[
    ['click', EventService.getDescriptor('click')],
    ['hover', EventService.getDescriptor('hover')]
  ]
);

const METADATA = Object.freeze(new ControlMetadata(
  'label',
  'Label',
  'HTML Label',
  SUPPORTED_EVENTS,
  SUPPORTED_PROPERTIES,
  SUPPORTED_STYLES
));

export class LabelControl extends Control {
  constructor(id: string, overrides?: IOverrides, triggers?: Trigger[]) {
    this.predefinedOverrides = new Overrides(
      '__predefined__', '__predefined__', PREDEFINED_OVERRIDES, true, false
    );

    super(id, LabelControl.getMeta(), overrides, triggers);
  }

  static getMeta() {
    return METADATA;
  }
}
