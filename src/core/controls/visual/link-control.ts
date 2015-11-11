import { Control } from '../control';
import { ControlMetadata } from '../control-metadata';
import { OwnedProperty, OwnedPropertyWithOptions } from '../../owned-property';
import { IProperty, Property, PropertyWithOptions } from '../../property';
import { StyleService } from '../../services/style-service';
import { EventService } from '../../services/event-service';
import { IAction } from '../../actions/action';
import { ControlState } from '../../controls/control-state';

const PREDEFINED_STATE = new ControlState('predefined', {
  styles: new Map<string, string>(<[string, string][]>[
    ['align-items', 'center'],
    ['color', '#0000ee'],
    ['display', 'inline'],
    ['text-decoration', 'underline']
  ])
});

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
    ['align-items', new OwnedPropertyWithOptions(
      null,
      StyleService.getDescriptor('align-items'),
      'align-items',
      PREDEFINED_STATE.overrides.styles
    )],
    ['background-color', StyleService.getDescriptor('background-color')],
    ['border', StyleService.getDescriptor('border')],
    ['border-radius', StyleService.getDescriptor('border-radius')],
    ['color', new OwnedProperty(
      null,
      StyleService.getDescriptor('color'),
      'color',
      PREDEFINED_STATE.overrides.styles
    )],
    ['display', new OwnedPropertyWithOptions(
      null,
      StyleService.getDescriptor('display'),
      'display',
      PREDEFINED_STATE.overrides.styles
    )],
    ['flex-basis', StyleService.getDescriptor('flex-basis')],
    ['flex-grow', StyleService.getDescriptor('flex-grow')],
    ['flex-shrink', StyleService.getDescriptor('flex-shrink')],
    ['font-size', StyleService.getDescriptor('font-size')],
    ['font-weight', StyleService.getDescriptor('font-weight')],
    ['height', StyleService.getDescriptor('height')],
    ['justify-content', StyleService.getDescriptor('justify-content')],
    ['line-height', StyleService.getDescriptor('line-height')],
    ['padding', StyleService.getDescriptor('padding')],
    ['text-decoration', new OwnedPropertyWithOptions(
      null,
      StyleService.getDescriptor('text-decoration'),
      'text-decoration',
      PREDEFINED_STATE.overrides.styles
    )]
  ]
);

const SUPPORTED_EVENTS = new Map<string, IProperty<Array<IAction>>>(
  <[string, IProperty<Array<IAction>>][]>[
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
  constructor(id: string, states?: ControlState[]) {
    super(id, LinkControl.getMeta(), states);
  }

  static getMeta() {
    return METADATA;
  }
}
