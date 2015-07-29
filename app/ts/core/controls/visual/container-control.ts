/// <reference path="../../../../../typings/tsd.d.ts" />
import { ISerializedControl, Control } from 'core/controls/control';
import {
  IVisualControlParameters,
  ISerializedVisualControlParameters,
  VisualControl
} from 'core/controls/visual/visual-control';
import { ControlProperty } from 'core/controls/control-property';
import {
  VisualControlMetadata
} from 'core/controls/visual/visual-control-metadata';
import { IProperty } from 'core/property';
import { IAction } from 'core/actions/action';
import { StyleService } from 'services/style-service';
import { EventService } from 'services/event-service';

interface IContainerParameters extends IVisualControlParameters {
  children?: Array<Control>;
}

export interface ISerializedContainerParameters
  extends ISerializedVisualControlParameters {
  children?: ISerializedControl[];
}

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

export class ContainerControl extends VisualControl {
  public children: Array<Control>;

  constructor(id, parameters?: IContainerParameters) {
    super(id, ContainerControl.getMeta(), parameters);

    this.children = parameters && parameters.children || [];
  }

  serialize() {
    var serializedChildren = [];
    this.children.forEach((control: Control) => {
      serializedChildren.push(control.serialize());
    });

    // TODO: Fore some reason Typescript compiles super.serialize to
    // VisualControl.serialize.call(this) instead of proper
    // VisualControl.prototype.serialize(call). So need to figure out why.
    var baseSerializedControl = VisualControl.prototype.serialize.call(this);

    if (serializedChildren.length) {
      baseSerializedControl.parameters['children'] = serializedChildren;
    }

    return baseSerializedControl;
  }

  static getMeta() {
    return METADATA;
  }
}
