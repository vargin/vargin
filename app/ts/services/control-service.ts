/// <reference path="../../../typings/tsd.d.ts" />
import { EventEmitter } from 'angular2/angular2';
import { ControlMetadata } from 'core/controls/control-metadata';

import { IAction } from 'core/actions/action';

import {
  Control,
  IControlParameters,
  ISerializedControl
} from 'core/controls/control';
import {
  ISerializedVisualControlParameters,
  IVisualControlParameters,
  VisualControl
} from 'core/controls/visual/visual-control';
import { ButtonControl } from 'core/controls/visual/button-control';
import {
  ContainerControl,
  ISerializedContainerParameters
} from 'core/controls/visual/container-control';
import { DataSourceControl } from 'core/controls/service/datasource-control';
import { LabelControl } from 'core/controls/visual/label-control';
import { RangeControl } from 'core/controls/visual/range-control';

import { UtilsService } from 'services/utils-service';

const CONTROLS = new Map<string, any>([
  ['button', ButtonControl],
  ['container', ContainerControl],
  ['datasource', DataSourceControl],
  ['label', LabelControl],
  ['range', RangeControl]
]);

export class ControlService {
  private static _activeControl: Control;

  static controlSelected: EventEmitter = new EventEmitter();

  get activeControl() {
    return ControlService._activeControl;
  }

  static selectControl(control: Control) {
    if (control !== this._activeControl) {
      ControlService._activeControl = control;
      ControlService.controlSelected.next(control);
    }
  }

  static getMetadata(type: string): ControlMetadata {
    if (!CONTROLS.has(type)) {
      throw new Error('Type is not supported: ' + type);
    }

    return CONTROLS.get(type).getMeta();
  }

  static create<TControl extends Control>(
    type: { new(id, parameters?): TControl; },
    parameters?: IControlParameters,
    id?: string
  ): TControl {
    return new type(id || UtilsService.uuid(), parameters);
  }

  static createByType<TControl extends Control>(
    type: string,
    parameters?: IControlParameters,
    id?: string
  ): TControl {
    if (!CONTROLS.has(type)) {
      throw new Error('Not supported control type: ' + type);
    }

    var ControlClass = <{ new(id, parameters?): TControl; }>CONTROLS.get(type);

    return new ControlClass(id || UtilsService.uuid(), parameters);
  }

  static deserialize<TControl extends Control>(
    serializedControl: ISerializedControl
  ): TControl  {
    var parameters = {
      properties: null,
      styles: null,
      events: null,
      children: null
    };

    var controlParameters = serializedControl.parameters;
    if (controlParameters) {
      if (controlParameters.properties) {
        parameters.properties = new Map(controlParameters.properties);
      }

      if ('styles' in controlParameters) {
        var visualControlParameters = <ISerializedVisualControlParameters>
          controlParameters;
        parameters.styles = new Map(visualControlParameters.styles);
      }

      if ('children' in controlParameters) {
        var containerParameters = <ISerializedContainerParameters>
          controlParameters;
        parameters.children = containerParameters.children.map(
          (serializedControl) => ControlService.deserialize(serializedControl)
        );
      }
    }

    return ControlService.createByType<TControl>(
      serializedControl.type, parameters, serializedControl.id
    );
  }
}
