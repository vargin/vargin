import { ControlMetadata } from '../controls/control-metadata';

import { Control } from '../controls/control';
import { IOverrides } from '../overrides/overrides';
import { Trigger } from '../triggers/trigger';

import { ButtonControl } from '../controls/visual/button-control';
import { ContainerControl } from '../controls/visual/container-control';
import { LabelControl } from '../controls/visual/label-control';
import { LinkControl } from '../controls/visual/link-control';
import { ListControl, ListItemControl } from '../controls/visual/list-control';
import { RangeControl } from '../controls/visual/range-control';
import { TextInputControl } from '../controls/visual/text-input-control';

import { DatasourceControl } from '../controls/service/datasource-control';

import { UtilsService } from './utils-service';

const CONTROL_CONFIG = new Map<string, Function>(<[string, Function][]>[
  ['button', ButtonControl],
  ['container', ContainerControl],
  ['datasource', DatasourceControl],
  ['label', LabelControl],
  ['link', LinkControl],
  ['list', ListControl],
  ['list-item', ListItemControl],
  ['range', RangeControl],
  ['text-input', TextInputControl]
]);

interface IControlType<TControl> {
  new(id: string, overrides?: IOverrides, triggers?: Trigger[]): TControl;
}

export class ControlService {
  static getMetadata(type: string): ControlMetadata {
    return (<any>CONTROL_CONFIG.get(type)).getMeta();
  }

  static createByType<TControl extends Control>(
    type: string, overrides?: IOverrides, triggers?: Trigger[], id?: string
  ): TControl {
    if (!CONTROL_CONFIG.has(type)) {
      throw new Error('Not supported control type: ' + type);
    }

    let ControlType = <IControlType<TControl>>CONTROL_CONFIG.get(type);
    return new ControlType(id || UtilsService.uuid(), overrides, triggers);
  }
}
