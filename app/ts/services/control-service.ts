/// <reference path="../../../typings/tsd.d.ts" />
import { EventEmitter } from 'angular2/angular2';

import BaseControl from 'core/controls/base-control';

class ControlService {
  private _activeControl: BaseControl<any>;

  controlSelected: EventEmitter;

  constructor() {
    this.controlSelected = new EventEmitter();
  }

  selectControl(control: BaseControl<any>) {
    if (control !== this._activeControl) {
      this._activeControl = control;
      this.controlSelected.next(control);
    }
  }

  get activeControl() {
    return this._activeControl;
  }
}

export default ControlService;