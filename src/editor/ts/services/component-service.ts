import { EventEmitter } from 'angular2/angular2';
import { ControlMetadata } from '../../../core/controls/control-metadata';

import { Control } from '../../../core/controls/control';
import { IOverrides } from '../../../core/overrides/overrides';

import { BaseComponent } from '../control-components/base-component';

import { UtilsService } from '../../../core/services/utils-service';

export class ComponentService {
  private static _activeComponent: BaseComponent;

  static controlSelected: EventEmitter<Control> = new EventEmitter<Control>();
  static controlUnselected: EventEmitter<Control> = new EventEmitter<Control>();

  static selectComponent(component: BaseComponent) {
    // Special case when different components have the same control attached.
    let isSilent = this._activeComponent &&
      this._activeComponent.control === component.control;

    if (this._activeComponent !== component) {
      this.unselectCurrentComponent(isSilent);
    }

    if (!this._activeComponent || this._activeComponent !== component) {
      ComponentService._activeComponent = component;
      component.select();

      if (!isSilent) {
        ComponentService.controlSelected.next(component.control);
      }
    }
  }

  static unselectCurrentComponent(isSilent: boolean = false) {
    if (!this._activeComponent) {
      return;
    }

    if (!isSilent) {
      ComponentService.controlUnselected.next(this._activeComponent.control);
    }

    this._activeComponent.unselect();
    this._activeComponent = null;
  }
}
