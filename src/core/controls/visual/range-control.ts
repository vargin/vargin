import { Control } from '../control';
import { ControlMetadata } from '../control-metadata';
import { IProperty, Property } from '../../property';
import { StyleService } from '../../services/style-service';
import { EventService } from '../../services/event-service';
import { IOverrides, Overrides } from '../../overrides/overrides';
import { Trigger } from '../../triggers/trigger';

const PREDEFINED_OVERRIDES = new Map(<[string, Map<string, string>][]>[
  ['styles', new Map(<[string, string][]>[
    ['align-items', 'center']
  ])]
]);

const SUPPORTED_PROPERTIES = new Map<string, IProperty<string>>(
  <[string, IProperty<string>][]>[
    ['min', new Property('Minimum', '0')],
    ['max', new Property('Maximum', '100')],
    ['step', new Property('Step', '1')],
    ['value', new Property('Value', '0')],
  ]
);

const SUPPORTED_STYLES = new Map<string, IProperty<string>>(
  <[string, IProperty<string>][]>[
    ['align-items', StyleService.getDescriptor('align-items')],
    ['justify-content', StyleService.getDescriptor('justify-content')],
    ['opacity', StyleService.getDescriptor('opacity')],
    ['padding', StyleService.getDescriptor('padding')]
  ]
);

const SUPPORTED_EVENTS = new Map<string, IProperty<string>>(
  <[string, IProperty<string>][]>[
    ['change', EventService.getDescriptor('change')]
  ]
);

const METADATA = Object.freeze(new ControlMetadata(
  'range',
  'Number Range',
  'Number Range',
  SUPPORTED_EVENTS,
  SUPPORTED_PROPERTIES,
  SUPPORTED_STYLES
));

export class RangeControl extends Control {
  constructor(id: string, overrides?: IOverrides, triggers?: Trigger[]) {
    this.predefinedOverrides = new Overrides(
      '__predefined__', PREDEFINED_OVERRIDES, true, false
    );

    super(id, RangeControl.getMeta(), overrides, triggers);
  }

  static getMeta() {
    return METADATA;
  }
}
