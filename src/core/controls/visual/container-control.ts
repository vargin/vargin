/// <reference path="../../../../typings/tsd.d.ts" />
import { Control } from 'core/controls/control';
import { ControlMetadata } from 'core/controls/control-metadata';
import { OwnedProperty, OwnedPropertyWithOptions } from 'core/owned-property';
import { IProperty } from 'core/property';
import { IAction } from 'core/actions/action';
import { StyleService } from 'core/services/style-service';
import { EventService } from 'core/services/event-service';
import { ControlState } from 'core/controls/control-state';

const PREDEFINED_STATE = new ControlState('predefined', {
  styles: new Map<string, string>(<[string, string][]>[
    ['display', 'block'],
    ['min-height', '5rem'],
    ['min-width', '5rem']
  ])
});

const SUPPORTED_STYLES = new Map<string, IProperty<string>>(
  <[string, IProperty<string>][]>[
    ['align-items', StyleService.getDescriptor('align-items')],
    ['background-color', StyleService.getDescriptor('background-color')],
    ['border', StyleService.getDescriptor('border')],
    ['color', StyleService.getDescriptor('color')],
    ['display', new OwnedPropertyWithOptions(
      null,
      StyleService.getDescriptor('display'),
      'display',
      PREDEFINED_STATE.overrides.styles
    )],
    ['flex-basis', StyleService.getDescriptor('flex-basis')],
    ['flex-direction', StyleService.getDescriptor('flex-direction')],
    ['flex-grow', StyleService.getDescriptor('flex-grow')],
    ['flex-shrink', StyleService.getDescriptor('flex-shrink')],
    ['font-size', StyleService.getDescriptor('font-size')],
    ['font-weight', StyleService.getDescriptor('font-weight')],
    ['justify-content', StyleService.getDescriptor('justify-content')],
    ['margin', StyleService.getDescriptor('margin')],
    [
      'min-height',
      new OwnedProperty(
        null,
        StyleService.getDescriptor('min-height'),
        'min-height',
        PREDEFINED_STATE.overrides.styles
      )
    ],
    [
      'min-width',
      new OwnedProperty(
        null,
        StyleService.getDescriptor('min-width'),
        'min-width',
        PREDEFINED_STATE.overrides.styles
      )
    ],
    ['padding', StyleService.getDescriptor('padding')]
  ]
);

const SUPPORTED_EVENTS = new Map<string, IProperty<Array<IAction>>>(
  <[string, IProperty<Array<IAction>>][]>[
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
  constructor(id: string, states?: ControlState[]) {
    super(id, ContainerControl.getMeta(), states);
  }

  static getMeta() {
    return METADATA;
  }
}
