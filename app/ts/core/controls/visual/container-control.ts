/// <reference path="../../../../../typings/tsd.d.ts" />
import BaseControl from 'core/controls/base-control';
import BaseVisualControl from 'core/controls/visual/base-visual-control';
import { ControlProperty } from 'core/controls/control-property';
import {
  VisualControlMetadata
} from 'core/controls/visual/visual-control-metadata';
import { IProperty } from 'core/property';
import { IAction } from 'core/actions/action';
import { StyleService } from 'services/style-service';
import { EventService } from 'services/event-service';

const SUPPORTED_STYLES =  new Map<string, IProperty<string>>([
  ['background-color', StyleService.getDescriptor('background-color')],
  [
    'border',
    new ControlProperty(
      StyleService.getDescriptor('border'), '1px solid red'
    )
  ],
  ['color', StyleService.getDescriptor('color')],
  [
    'min-height',
    new ControlProperty(
      StyleService.getDescriptor('min-height'), '5rem'
    )
  ]
]);

const SUPPORTED_EVENTS = new Map<string, IProperty<Array<IAction>>>([
  ['click', EventService.getDescriptor('click')],
  ['hover', EventService.getDescriptor('hover')]
]);

const METADATA = Object.freeze(new VisualControlMetadata(
  'container',
  'Container',
  'Container',
  SUPPORTED_EVENTS,
  null,
  SUPPORTED_STYLES
));

export default class ContainerControl extends BaseVisualControl {
  public children: Array<BaseControl> = [];

  constructor(id, properties?, styles?, events?) {
    super(id, ContainerControl.getMeta(), properties, styles, events);
  }

  static getMeta() {
    return METADATA;
  }
}
