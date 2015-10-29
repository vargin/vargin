/// <reference path="../../../../typings/tsd.d.ts" />
import {
  VisualControl,
  IVisualControlParameters
} from 'core/controls/visual/visual-control';
import { OwnedProperty, OwnedPropertyWithOptions } from 'core/owned-property';
import {
  VisualControlMetadata
} from 'core/controls/visual/visual-control-metadata';
import { IProperty, Property, PropertyWithOptions } from 'core/property';
import { StyleService } from 'core/services/style-service';
import { EventService } from 'core/services/event-service';
import { IAction } from 'core/actions/action';

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

const METADATA = Object.freeze(new VisualControlMetadata(
  'link',
  'Link',
  'Link to another Web Page',
  SUPPORTED_EVENTS,
  SUPPORTED_PROPERTIES,
  SUPPORTED_STYLES
));

export class LinkControl extends VisualControl {
  constructor(id: string, parameters?: IVisualControlParameters) {
    super(id, LinkControl.getMeta(), parameters);
  }

  get address() {
    return this._properties.get('address');
  }

  get text() {
    return this._properties.get('text');
  }

  get title() {
    return this._properties.get('title');
  }

  get target() {
    return this._properties.get('target');
  }

  static getMeta() {
    return METADATA;
  }
}
