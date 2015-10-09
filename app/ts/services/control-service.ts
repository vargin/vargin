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

import { BaseComponent } from 'editor/control-components/base-component';

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
  private static _activeComponent: BaseComponent;

  static controlSelected: EventEmitter = new EventEmitter();
  static controlUnselected: EventEmitter = new EventEmitter();

  static selectComponent(component: BaseComponent) {
    // Special case when different components have the same control attached.
    let isSilent = this._activeComponent &&
      this._activeComponent.control === component.control;

    if (this._activeComponent !== component) {
      this.unselectCurrentComponent(isSilent);
    }

    if (!this._activeComponent || this._activeComponent !== component) {
      ControlService._activeComponent = component;
      component.select();

      if (!isSilent) {
        ControlService.controlSelected.next(component.control);
      }
    }
  }

  static unselectCurrentComponent(isSilent: boolean = false) {
    if (!this._activeComponent) {
      return;
    }

    if (!isSilent) {
      ControlService.controlUnselected.next(this._activeComponent.control);
    }

    this._activeComponent.unselect();
    this._activeComponent = null;
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
