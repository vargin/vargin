/// <reference path="../../../typings/tsd.d.ts" />
import { EventEmitter } from 'angular2/angular2';
import { ControlMetadata } from 'core/controls/control-metadata';

import { IAction } from 'core/actions/action';

import BaseControl from 'core/controls/base-control';
import ButtonControl from 'core/controls/visual/button-control';
import ContainerControl from 'core/controls/visual/container-control';
import DatasourceControl from 'core/controls/service/datasource-control';
import LabelControl from 'core/controls/visual/label-control';
import RangeControl from 'core/controls/visual/range-control';

import { UtilsService } from 'services/utils-service';

const CONTROLS = new Map<string, any>([
  ['button', ButtonControl],
  ['container', ContainerControl],
  ['datasource', DatasourceControl],
  ['label', LabelControl],
  ['range', RangeControl]
]);

interface ControlParameters {
  properties?: Map<string, string>,
  styles?: Map<string, string>,
  events?: Map<string, Array<IAction>>
}

export class ControlService {
  private static _activeControl: BaseControl;

  static controlSelected: EventEmitter = new EventEmitter();

  get activeControl() {
    return ControlService._activeControl;
  }

  static selectControl(control: BaseControl) {
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

  static create<TControl extends BaseControl>(
    type: { new(id, properties?, styles?, events?): TControl; },
    parameters: ControlParameters = {}
  ): TControl {
    return new type(
      UtilsService.uuid(),
      parameters.properties,
      parameters.styles,
      parameters.events
    );
  }

  static createByType<TControl extends BaseControl>(
    type: string,
    parameters: ControlParameters = {}
  ): TControl {
    if (!CONTROLS.has(type)) {
      throw new Error('Not supported component type: ' + type);
    }

    var ControlClass = <{ new(id, properties?, styles?, events?): TControl; }>
      CONTROLS.get(type);

    return new ControlClass(
      UtilsService.uuid(),
      parameters.properties,
      parameters.styles,
      parameters.events
    );
  }
}
