/// <reference path="../../../../typings/tsd.d.ts" />
import {
  VisualControl,
  IVisualControlParameters
} from 'core/controls/visual/visual-control';
import { OwnedPropertyWithOptions } from 'core/owned-property';
import {
    VisualControlMetadata
} from 'core/controls/visual/visual-control-metadata';
import { IProperty, Property, PropertyWithOptions } from 'core/property';
import { IAction } from 'core/actions/action';
import { StyleService } from 'core/services/style-service';
import { EventService } from 'core/services/event-service';
import { StringFormatType } from 'core/tools/string-formatter';
import { ControlState } from 'core/controls/control-state';

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
      null, StyleService.getDescriptor('align-items'), 'center'
    )],
    ['background-color', StyleService.getDescriptor('background-color')],
    ['color', StyleService.getDescriptor('color')],
    ['display', new OwnedPropertyWithOptions(
      null, StyleService.getDescriptor('display'), 'inline'
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

const METADATA = Object.freeze(new VisualControlMetadata(
  'label',
  'Label',
  'HTML Label',
  SUPPORTED_EVENTS,
  SUPPORTED_PROPERTIES,
  SUPPORTED_STYLES
));

export class LabelControl extends VisualControl {
  constructor(
    id: string, states?: ControlState[], parameters?: IVisualControlParameters
  ) {
    super(id, LabelControl.getMeta(), states, parameters);
  }

  get text() {
    return this.getProperty('text');
  }

  get title() {
    return this.getProperty('title');
  }

  get format() {
    return this.getProperty('format');
  }

  static getMeta() {
    return METADATA;
  }
}
