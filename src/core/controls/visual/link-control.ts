import { Control } from '../control';
import { ControlMetadata } from '../control-metadata';
import { IProperty, Property, PropertyWithOptions } from '../../property';
import { StyleService } from '../../services/style-service';
import { EventService } from '../../services/event-service';
import { IOverrides, Overrides } from '../../overrides/overrides';

const PREDEFINED_OVERRIDES = new Map(<[string, Map<string, string>][]>[
  ['styles', new Map(<[string, string][]>[
    ['align-items', 'center'],
    ['color', '#0000ee'],
    ['display', 'inline'],
    ['text-decoration', 'underline']
  ])]
]);

const SUPPORTED_PROPERTIES = new Map<string, IProperty<string>>(
  <[string, IProperty<string>][]>[
    ['text', new Property('Text', '[Link]')],
    ['title', new Property('Title', '[Link Title]')],
    ['address', new Property('Address', '', 'url')],
    ['target', new PropertyWithOptions('Target', [
      new Property('Same Tab', '_self'),
      new Property('New Tab', '_blank')
    ])]
  ]
);

const SUPPORTED_STYLES = new Map<string, IProperty<string>>(
  <[string, IProperty<string>][]>[
    ['align-items', StyleService.getDescriptor('align-items')],
    ['background-color', StyleService.getDescriptor('background-color')],
    ['border', StyleService.getDescriptor('border')],
    ['border-radius', StyleService.getDescriptor('border-radius')],
    ['color', StyleService.getDescriptor('color')],
    ['display', StyleService.getDescriptor('display')],
    ['flex-basis', StyleService.getDescriptor('flex-basis')],
    ['flex-grow', StyleService.getDescriptor('flex-grow')],
    ['flex-shrink', StyleService.getDescriptor('flex-shrink')],
    ['font-size', StyleService.getDescriptor('font-size')],
    ['font-weight', StyleService.getDescriptor('font-weight')],
    ['height', StyleService.getDescriptor('height')],
    ['justify-content', StyleService.getDescriptor('justify-content')],
    ['line-height', StyleService.getDescriptor('line-height')],
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
  'link',
  'Link',
  'Link to another Web Page',
  SUPPORTED_EVENTS,
  SUPPORTED_PROPERTIES,
  SUPPORTED_STYLES
));

export class LinkControl extends Control {
  constructor(id: string, overrides?: IOverrides) {
    this.predefinedOverrides = new Overrides(
      '__predefined__', '__predefined__', PREDEFINED_OVERRIDES, true, false
    );

    super(id, LinkControl.getMeta(), overrides);
  }

  static getMeta() {
    return METADATA;
  }
}
