import { Type } from 'angular2/angular2';
import { ControlMetadata } from '../controls/control-metadata';

import { Control } from '../controls/control';
import { IOverrides } from '../overrides/overrides';

import { ButtonControl } from '../controls/visual/button-control';
import { ContainerControl } from '../controls/visual/container-control';
import { LabelControl } from '../controls/visual/label-control';
import { LinkControl } from '../controls/visual/link-control';
import { ListControl, ListItemControl } from '../controls/visual/list-control';
import { RangeControl } from '../controls/visual/range-control';
import { TextInputControl } from '../controls/visual/text-input-control';

import { DatasourceControl } from '../controls/service/datasource-control';

import { UtilsService } from './utils-service';

const CONTROL_CONFIG = new Map<string, Type>(<[string, Type][]>[
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
  new(id: string, overrides?: IOverrides, children?: Control[]): TControl;
}

export class ControlService {
  static getMetadata(type: string): ControlMetadata {
    return (<any>CONTROL_CONFIG.get(type)).getMeta();
  }

  static create<TControl extends Control>(
    type: IControlType<TControl>, overrides?: IOverrides, id?: string
  ): TControl {
    return new type(id || UtilsService.uuid(), overrides);
  }

  static createByType<TControl extends Control>(
    type: string, overrides?: IOverrides, id?: string
  ): Promise<TControl> {

    let ControlType = <IControlType<TControl>>CONTROL_CONFIG.get(type);
    return Promise.resolve(
      new ControlType(id || UtilsService.uuid(), overrides)
    );
  }
}
