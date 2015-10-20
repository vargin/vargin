/// <reference path="../../../typings/tsd.d.ts" />
import { Type } from 'angular2/angular2';

interface ITypeDescription {
  name: string;
  path: string;
}

const CONTROL_CONFIG = new Map<string, [ITypeDescription, ITypeDescription]>([
  ['button', [{
    name: 'ButtonControl',
    path: 'core/controls/visual/button-control'
  }, {
    name: 'ButtonComponent',
    path: 'editor/control-components/visual/button-component'
  }]],
  ['container', [{
    name: 'ContainerControl',
    path: 'core/controls/visual/container-control'
  }, {
    name: 'ContainerComponent',
    path: 'editor/control-components/visual/container-component'
  }]],
  ['datasource', [{
    name: 'DatasourceControl',
    path: 'core/controls/service/datasource-control'
  }, {
    name: 'DatasourceComponent',
    path: 'editor/control-components/service/datasource-component'
  }]],
  ['label', [{
    name: 'LabelControl',
    path: 'core/controls/visual/label-control'
  }, {
    name: 'LabelComponent',
    path: 'editor/control-components/visual/label-component'
  }]],
  ['link', [{
    name: 'LinkControl',
    path: 'core/controls/visual/link-control'
  }, {
    name: 'LinkComponent',
    path: 'editor/control-components/visual/link-component'
  }]],
  ['list', [{
    name: 'ListControl',
    path: 'core/controls/visual/list-control'
  }, {
    name: 'ListComponent',
    path: 'editor/control-components/visual/list-component'
  }]],
  ['range', [{
    name: 'RangeControl',
    path: 'core/controls/visual/range-control'
  }, {
    name: 'RangeComponent',
    path: 'editor/control-components/visual/range-component'
  }]],
  ['text-input', [{
    name: 'TextInputControl',
    path: 'core/controls/visual/text-input-control'
  }, {
    name: 'TextInputComponent',
    path: 'editor/control-components/visual/text-input-component'
  }]]
]);

export class ControlConfigService {
  static loadControlType(controlType: string): Promise<Type> {
    return ControlConfigService.loadType(
      CONTROL_CONFIG.get(controlType)[0]
    );
  }

  static loadComponentType(controlType: string): Promise<Type> {
    return ControlConfigService.loadType(
      CONTROL_CONFIG.get(controlType)[1]
    );
  }

  private static loadType(classDescription: ITypeDescription): Promise<Type> {
    return System.import(classDescription.path).then(
      (module: any) => module[classDescription.name]
    );
  }
}
