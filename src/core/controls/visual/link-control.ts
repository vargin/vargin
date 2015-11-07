/// <reference path="../../../../typings/tsd.d.ts" />
import { Control, IControlParameters } from 'core/controls/control';
import { ControlMetadata } from 'core/controls/control-metadata';
import { OwnedProperty, OwnedPropertyWithOptions } from 'core/owned-property';
import { IProperty, Property, PropertyWithOptions } from 'core/property';
import { StyleService } from 'core/services/style-service';
import { EventService } from 'core/services/event-service';
import { IAction } from 'core/actions/action';
import { ControlState } from 'core/controls/control-state';

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
      null, StyleService.getDescriptor('align-items'), 'center'
    )],
    ['background-color', StyleService.getDescriptor('background-color')],
    ['border', StyleService.getDescriptor('border')],
    ['border-radius', StyleService.getDescriptor('border-radius')],
    ['color', new OwnedProperty(
      null, StyleService.getDescriptor('color'), '#0000ee'
    )],
    ['display', new OwnedPropertyWithOptions(
      null, StyleService.getDescriptor('display'), 'inline'
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
      null, StyleService.getDescriptor('text-decoration'), 'underline'
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
  constructor(
    id: string, states?: ControlState[], parameters?: IControlParameters
  ) {
    super(id, LinkControl.getMeta(), states, parameters);
  }

  static getMeta() {
    return METADATA;
  }
}
