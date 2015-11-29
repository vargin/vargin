import { Control } from '../control';
import { ControlMetadata } from '../control-metadata';
import { IProperty } from '../../property';
import { StyleService } from '../../services/style-service';
import { EventService } from '../../services/event-service';
import { UtilsService } from '../../services/utils-service';
import { IOverrides, Overrides } from '../../overrides/overrides';
import { Trigger } from '../../triggers/trigger';

const PREDEFINED_OVERRIDES = new Map(<[string, Map<string, string>][]>[
  ['styles', new Map(<[string, string][]>[
    ['display', 'block'],
    ['min-height', '5rem'],
    ['min-width', '5rem']
  ])]
]);

const SUPPORTED_STYLES = new Map<string, IProperty<string>>(
  <[string, IProperty<string>][]>[
    ['align-items', StyleService.getDescriptor('align-items')],
    ['background-color', StyleService.getDescriptor('background-color')],
    ['border', StyleService.getDescriptor('border')],
    ['color', StyleService.getDescriptor('color')],
    ['display', StyleService.getDescriptor('display')],
    ['flex-basis', StyleService.getDescriptor('flex-basis')],
    ['flex-direction', StyleService.getDescriptor('flex-direction')],
    ['flex-grow', StyleService.getDescriptor('flex-grow')],
    ['flex-shrink', StyleService.getDescriptor('flex-shrink')],
    ['font-size', StyleService.getDescriptor('font-size')],
    ['font-weight', StyleService.getDescriptor('font-weight')],
    ['justify-content', StyleService.getDescriptor('justify-content')],
    ['margin', StyleService.getDescriptor('margin')],
    ['min-height', StyleService.getDescriptor('min-height')],
    ['min-width', StyleService.getDescriptor('min-width')],
    ['padding', StyleService.getDescriptor('padding')]
  ]
);

const SUPPORTED_EVENTS = new Map<string, IProperty<string>>(
  <[string, IProperty<string>][]>[
    ['click', EventService.getDescriptor('click')],
    ['hover', EventService.getDescriptor('hover')]
  ]
);

const METADATA: ControlMetadata = Object.freeze(new ControlMetadata(
  'container',
  'Container',
  'Container',
  SUPPORTED_EVENTS,
  null,
  SUPPORTED_STYLES
));

export class ContainerControl extends Control {
  constructor(id: string, overrides?: IOverrides, triggers?: Trigger[]) {
    this.predefinedOverrides =  new Overrides(
      '__predefined__', '__predefined__', PREDEFINED_OVERRIDES, true, false
    );

    super(id, ContainerControl.getMeta(), overrides, triggers);
  }

  static getMeta() {
    return METADATA;
  }
}
