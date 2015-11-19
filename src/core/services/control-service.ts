import { Type } from 'angular2/angular2';
import { ControlMetadata } from '../controls/control-metadata';

import { Control } from '../controls/control';
import { IOverrides } from '../overrides/overrides';

import { UtilsService } from './utils-service';

interface ITypeDescription {
  name: string;
  path: string;
}

const CONTROL_CONFIG = new Map<string, ITypeDescription>(
  <[string, ITypeDescription][]>[
    ['button', {
      name: 'ButtonControl',
      path: 'src/core/controls/visual/button-control'
    }],
    ['container', {
      name: 'ContainerControl',
      path: 'src/core/controls/visual/container-control'
    }],
    ['datasource', {
      name: 'DatasourceControl',
      path: 'src/core/controls/service/datasource-control'
    }],
    ['label', {
      name: 'LabelControl',
      path: 'src/core/controls/visual/label-control'
    }],
    ['link', {
      name: 'LinkControl',
      path: 'src/core/controls/visual/link-control'
    }],
    ['list', {
      name: 'ListControl',
      path: 'src/core/controls/visual/list-control'
    }],
    ['list-item', {
      name: 'ListItemControl',
      path: 'src/core/controls/visual/list-control'
    }],
    ['range', {
      name: 'RangeControl',
      path: 'src/core/controls/visual/range-control'
    }],
    ['text-input', {
      name: 'TextInputControl',
      path: 'src/core/controls/visual/text-input-control'
    }]
  ]
);

interface IControlType<TControl> {
  new(id: string, overrides?: IOverrides, children?: Control[]): TControl;
}

export class ControlService {
  static getMetadata(type: string): Promise<ControlMetadata> {
    return ControlService.loadType(type).then((type: any) => {
      return type.getMeta();
    });
  }

  static create<TControl extends Control>(
    type: IControlType<TControl>, overrides?: IOverrides, id?: string
  ): TControl {
    return new type(id || UtilsService.uuid(), overrides);
  }

  static createByType<TControl extends Control>(
    type: string, overrides?: IOverrides, id?: string
  ): Promise<TControl> {

    return ControlService.loadType(type).then(
      (ControlType: IControlType<TControl>) => {
        return new ControlType(id || UtilsService.uuid(), overrides);
      }
    );
  }

  private static loadType(controlType: string): Promise<Type> {
    let classDescription = CONTROL_CONFIG.get(controlType);
    return System.import(classDescription.path).then(
      (module: any) => module[classDescription.name]
    );
  }
}
