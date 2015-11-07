/// <reference path="../../../../typings/tsd.d.ts" />
import { Control } from 'core/controls/control';
import { ControlMetadata } from 'core/controls/control-metadata';
import { OwnedProperty } from 'core/owned-property';
import { IProperty, Property } from 'core/property';
import { IAction } from 'core/actions/action';
import { StyleService } from 'core/services/style-service';
import { EventService } from 'core/services/event-service';
import { ControlState } from 'core/controls/control-state';

const PREDEFINED_STATE = new ControlState('predefined', {
  styles: new Map<string, string>(<[string, string][]>[
    ['border', '0.1rem solid #c7c7c7']
  ])
});

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
        null,
        StyleService.getDescriptor('border'),
        'border',
        PREDEFINED_STATE.overrides.styles
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

const METADATA = Object.freeze(new ControlMetadata(
  'text-input',
  'Text Input',
  'Text Input',
  SUPPORTED_EVENTS,
  SUPPORTED_PROPERTIES,
  SUPPORTED_STYLES
));

export class TextInputControl extends Control {
  constructor(id: string, states?: ControlState[]) {
    super(id, TextInputControl.getMeta(), states);
  }

  static getMeta() {
    return METADATA;
  }
}
