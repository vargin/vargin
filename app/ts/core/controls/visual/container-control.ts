/// <reference path="../../../../../typings/tsd.d.ts" />
import { VisualControl } from 'core/controls/visual/visual-control';
import {
  ControlProperty,
  ControlPropertyWithOptions
} from 'core/controls/control-property';
import {
  VisualControlMetadata
} from 'core/controls/visual/visual-control-metadata';
import { IProperty } from 'core/property';
import { IAction } from 'core/actions/action';
import { StyleService } from 'services/style-service';
import { EventService } from 'services/event-service';

const SUPPORTED_STYLES =  new Map<string, IProperty<string>>([
  ['align-items', StyleService.getDescriptor('align-items')],
  ['background-color', StyleService.getDescriptor('background-color')],
  [
    'border',
    new ControlProperty(
      StyleService.getDescriptor('border'), '1px solid red'
    )
  ],
  ['color', StyleService.getDescriptor('color')],
  ['display', new ControlPropertyWithOptions(
    StyleService.getDescriptor('display'), 'block'
  )],
  ['flex-direction', StyleService.getDescriptor('flex-direction')],
  ['justify-content', StyleService.getDescriptor('justify-content')],
  [
    'min-height',
    new ControlProperty(
      StyleService.getDescriptor('min-height'), '5rem'
    )
  ],
  [
    'min-width',
    new ControlProperty(
      StyleService.getDescriptor('min-width'), '5rem'
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

export class ContainerControl extends VisualControl {
  constructor(id, parameters?) {
    super(id, ContainerControl.getMeta(), parameters);
  }

  static getMeta() {
    return METADATA;
  }
}
