/// <reference path="../../../../typings/tsd.d.ts" />
import { Control } from 'core/controls/control';
import {
  VisualControl,
  IVisualControlParameters
} from 'core/controls/visual/visual-control';
import { ContainerControl } from 'core/controls/visual/container-control';
import { OwnedProperty, OwnedPropertyWithOptions } from 'core/owned-property';
import {
  VisualControlMetadata
} from 'core/controls/visual/visual-control-metadata';
import { IProperty, Property } from 'core/property';
import { IAction } from 'core/actions/action';
import { StyleService } from 'core/services/style-service';
import { EventService } from 'core/services/event-service';

const LIST_ITEM_METADATA = Object.freeze(new VisualControlMetadata(
  'list-item',
  'List Item',
  'List item',
  ContainerControl.getMeta().supportedEvents,
  null,
  ContainerControl.getMeta().supportedStyles
));

export class ListItemControl extends VisualControl {
  constructor(id: string, parameters?: IVisualControlParameters) {
    super(id, LIST_ITEM_METADATA, parameters);
  }

  static getMeta() {
    return LIST_ITEM_METADATA;
  }
}

const SUPPORTED_PROPERTIES = new Map<string, IProperty<string>>([
  ['datasource', new Property<string>('Datasource', '', 'datasource')]
]);

const SUPPORTED_STYLES =  new Map<string, IProperty<string>>([
  ['align-items', StyleService.getDescriptor('align-items')],
  ['background-color', StyleService.getDescriptor('background-color')],
  ['border', StyleService.getDescriptor('border')],
  ['color', StyleService.getDescriptor('color')],
  ['display', new OwnedPropertyWithOptions(
    null, StyleService.getDescriptor('display'), 'flex'
  )],
  ['flex-basis', StyleService.getDescriptor('flex-basis')],
  ['flex-direction', new OwnedPropertyWithOptions(
    null, StyleService.getDescriptor('flex-direction'), 'column'
  )],
  ['flex-grow', StyleService.getDescriptor('flex-grow')],
  ['flex-shrink', StyleService.getDescriptor('flex-shrink')],
  ['font-size', StyleService.getDescriptor('font-size')],
  ['justify-content', new OwnedPropertyWithOptions(
    null, StyleService.getDescriptor('justify-content'), 'space-between'
  )],
  [
    'min-height',
    new OwnedProperty(
      null, StyleService.getDescriptor('min-height'), '5rem'
    )
  ],
  [
    'min-width',
    new OwnedProperty(
      null, StyleService.getDescriptor('min-width'), '5rem'
    )
  ],
  [
    'padding',
    new OwnedProperty(
      null, StyleService.getDescriptor('padding'), '1rem'
    )
  ]
]);

const SUPPORTED_EVENTS = new Map<string, IProperty<Array<IAction>>>([
  ['click', EventService.getDescriptor('click')],
  ['hover', EventService.getDescriptor('hover')]
]);

const METADATA = Object.freeze(new VisualControlMetadata(
  'list',
  'List',
  'List of the items',
  SUPPORTED_EVENTS,
  SUPPORTED_PROPERTIES,
  SUPPORTED_STYLES
));

export class ListControl extends VisualControl {
  constructor(id: string, parameters?: IVisualControlParameters) {
    super(id, ListControl.getMeta(), parameters);
  }

  get datasource() {
    return this._properties.get('datasource');
  }

  getTemplate(): ListItemControl {
    let children = this.getChildren();
    return children.length ? <ListItemControl>children[0] : null;
  }

  setTemplate(template: ListItemControl) {
    let children = this.getChildren();
    if (children.length) {
      this.removeChild(children[0]);
    }

    if (template) {
      this.addChild(template);
    }
  }

  static getMeta() {
    return METADATA;
  }
}
