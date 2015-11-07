/// <reference path="../../../../typings/tsd.d.ts" />
import { Control } from 'core/controls/control';
import { ControlMetadata } from 'core/controls/control-metadata';
import { OwnedPropertyWithOptions } from 'core/owned-property';
import { IProperty, Property, PropertyWithOptions } from 'core/property';
import { IAction } from 'core/actions/action';
import { StyleService } from 'core/services/style-service';
import { EventService } from 'core/services/event-service';
import { StringFormatType } from 'core/tools/string-formatter';
import { ControlState } from 'core/controls/control-state';

const PREDEFINED_STATE = new ControlState('predefined', {
  styles: new Map<string, string>(<[string, string][]>[
    ['align-items', 'center'],
    ['display', 'inline']
  ])
});

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
    ['align-items', new OwnedPropertyWithOptions(
      null,
      StyleService.getDescriptor('align-items'),
      'align-items',
      PREDEFINED_STATE.overrides.styles
    )],
    ['background-color', StyleService.getDescriptor('background-color')],
    ['color', StyleService.getDescriptor('color')],
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
    ['justify-content', StyleService.getDescriptor('justify-content')],
    ['margin', StyleService.getDescriptor('margin')],
    ['padding', StyleService.getDescriptor('padding')],
    ['text-decoration', StyleService.getDescriptor('text-decoration')]
  ]
);

const SUPPORTED_EVENTS = new Map<string, IProperty<Array<IAction>>>(
  <[string, IProperty<Array<IAction>>][]>[
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
  constructor(id: string, states?: ControlState[]) {
    super(id, LabelControl.getMeta(), states);
  }

  static getMeta() {
    return METADATA;
  }
}
