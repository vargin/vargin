import { Control } from '../control';
import { ControlMetadata } from '../control-metadata';
import { IProperty, Property } from '../../property';
import { StyleService } from '../../services/style-service';
import { EventService } from '../../services/event-service';
import { IOverrides, Overrides } from '../../overrides/overrides';

const PREDEFINED_OVERRIDES = new Map(<[string, Map<string, string>][]>[
  ['styles', new Map(<[string, string][]>[
    ['border', '0.1rem solid #c7c7c7']
  ])]
]);

const SUPPORTED_PROPERTIES = new Map<string, IProperty<string>>(
  <[string, IProperty<string>][]>[
    ['placeholder', new Property('Placeholder', '[Placeholder]')],
    ['value', new Property('Value', '')],
  ]
);

const SUPPORTED_STYLES = new Map<string, IProperty<string>>(
  <[string, IProperty<string>][]>[
    ['background-color', StyleService.getDescriptor('background-color')],
    ['border', StyleService.getDescriptor('border')],
    ['color', StyleService.getDescriptor('color')],
    ['flex-basis', StyleService.getDescriptor('flex-basis')],
    ['flex-grow', StyleService.getDescriptor('flex-grow')],
    ['flex-shrink', StyleService.getDescriptor('flex-shrink')],
    ['font-size', StyleService.getDescriptor('font-size')],
    ['font-weight', StyleService.getDescriptor('font-weight')],
    ['padding', StyleService.getDescriptor('padding')]
  ]
);

const SUPPORTED_EVENTS = new Map<string, IProperty<string>>(
  <[string, IProperty<string>][]>[
    ['change', EventService.getDescriptor('change')]
  ]
);

const METADATA = Object.freeze(new ControlMetadata(
  'text-input',
  'Text Input',
  'Text Input',
  SUPPORTED_EVENTS,
  SUPPORTED_PROPERTIES,
  SUPPORTED_STYLES
));

export class TextInputControl extends Control {
  constructor(id: string, overrides?: IOverrides) {
    this.predefinedOverrides = new Overrides(
      '__predefined__', '__predefined__', PREDEFINED_OVERRIDES, true, false
    );

    super(id, TextInputControl.getMeta(), overrides);
  }

  static getMeta() {
    return METADATA;
  }
}
