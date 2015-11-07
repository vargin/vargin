/// <reference path="../../../../typings/tsd.d.ts" />
import { Control } from 'core/controls/control';
import { ControlMetadata } from 'core/controls/control-metadata';
import { IProperty, Property } from 'core/property';
import { IAction } from 'core/actions/action';
import { StyleService } from 'core/services/style-service';
import { EventService } from 'core/services/event-service';
import { ControlState } from 'core/controls/control-state';

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
    ['opacity', StyleService.getDescriptor('opacity')],
    ['padding', StyleService.getDescriptor('padding')]
  ]
);

const SUPPORTED_EVENTS = new Map<string, IProperty<Array<IAction>>>(
  <[string, IProperty<Array<IAction>>][]>[
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
  constructor(id: string, states?: ControlState[]) {
    super(id, RangeControl.getMeta(), states);
  }

  static getMeta() {
    return METADATA;
  }
}
