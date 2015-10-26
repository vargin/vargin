/// <reference path="../../../../typings/tsd.d.ts" />
import { EventEmitter } from 'angular2/angular2';
import { ControlMetadata } from 'core/controls/control-metadata';

import { Control, IControlParameters } from 'core/controls/control';

import { BaseComponent } from 'editor/control-components/base-component';

import { UtilsService } from 'core/services/utils-service';
import { ControlConfigService } from 'editor/services/control-config-service';

interface IControlType<TControl> {
  new(
    id: string,
    parameters?: IControlParameters,
    children?: Control[]
  ): TControl;
}

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

  static getMetadata(type: string): Promise<ControlMetadata> {
    return ControlConfigService.loadControlType(type).then((type: any) => {
      return type.getMeta();
    });
  }

  static create<TControl extends Control>(
    type: IControlType<TControl>, parameters?: IControlParameters, id?: string
  ): TControl {
    return new type(id || UtilsService.uuid(), parameters);
  }

  static createByType<TControl extends Control>(
    type: string,
    parameters?: IControlParameters,
    id?: string
  ): Promise<TControl> {

    return ControlConfigService.loadControlType(type).then(
      (ControlType: IControlType<TControl>) => {
        return new ControlType(id || UtilsService.uuid(), parameters);
      }
    );
  }
}
