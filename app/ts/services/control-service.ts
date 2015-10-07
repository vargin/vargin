/// <reference path="../../../typings/tsd.d.ts" />
import { EventEmitter, ViewContainerRef } from 'angular2/angular2';
import { ControlMetadata } from 'core/controls/control-metadata';

import { IAction } from 'core/actions/action';

import { Control, IControlParameters } from 'core/controls/control';
import { VisualControl } from 'core/controls/visual/visual-control';
import { ButtonControl } from 'core/controls/visual/button-control';
import { ContainerControl } from 'core/controls/visual/container-control';
import { DatasourceControl } from 'core/controls/service/datasource-control';
import { LabelControl } from 'core/controls/visual/label-control';
import { LinkControl } from 'core/controls/visual/link-control';
import { RangeControl } from 'core/controls/visual/range-control';
import { TextInputControl } from 'core/controls/visual/text-input-control';

import { UtilsService } from 'services/utils-service';

const CONTROLS = new Map<string, any>([
  ['button', ButtonControl],
  ['container', ContainerControl],
  ['datasource', DatasourceControl],
  ['label', LabelControl],
  ['link', LinkControl],
  ['range', RangeControl],
  ['text-input', TextInputControl]
]);

export class ControlService {
  private static _activeControl: { control: Control, view: ViewContainerRef };

  static controlSelected: EventEmitter = new EventEmitter();
  static controlUnselected: EventEmitter = new EventEmitter();

  static get activeControl() {
    return ControlService._activeControl;
  }

  static selectControl(control: Control, view: ViewContainerRef) {
    if (this._activeControl && this._activeControl.control !== control) {
      ControlService.unselectCurrentControl();
    }

    if (!this._activeControl || this._activeControl.control !== control) {
      ControlService._activeControl = { control, view };
      ControlService.controlSelected.next(ControlService._activeControl);
    }
  }

  static unselectCurrentControl() {
    if (this._activeControl) {
      ControlService.controlUnselected.next(this._activeControl);
      this._activeControl = null;
    }
  }

  static getMetadata(type: string): ControlMetadata {
    if (!CONTROLS.has(type)) {
      throw new Error('Type is not supported: ' + type);
    }

    return CONTROLS.get(type).getMeta();
  }

  static create<TControl extends Control>(
    type: { new(id: string, parameters?: IControlParameters): TControl; },
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

    let ControlClass = <{
      new(
        id: string, parameters?: IControlParameters, children?: Control[]
      ): TControl;
    }>CONTROLS.get(type);

    return new ControlClass(id || UtilsService.uuid(), parameters);
  }
}
