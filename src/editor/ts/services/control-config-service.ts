import { Type } from 'angular2/angular2';

interface ITypeDescription {
  name: string;
  path: string;
}

const CONTROL_CONFIG = new Map<string, [ITypeDescription, ITypeDescription]>(
  <[string, [ITypeDescription, ITypeDescription]][]>[
    ['button', [{
      name: 'ButtonControl',
      path: 'src/core/controls/visual/button-control'
    }, {
      name: 'ButtonComponent',
      path: 'src/editor/ts/control-components/visual/button-component'
    }]],
    ['container', [{
      name: 'ContainerControl',
      path: 'src/core/controls/visual/container-control'
    }, {
      name: 'ContainerComponent',
      path: 'src/editor/ts/control-components/visual/container-component'
    }]],
    ['datasource', [{
      name: 'DatasourceControl',
      path: 'src/core/controls/service/datasource-control'
    }, {
      name: 'DatasourceComponent',
      path: 'src/editor/ts/control-components/service/datasource-component'
    }]],
    ['label', [{
      name: 'LabelControl',
      path: 'src/core/controls/visual/label-control'
    }, {
      name: 'LabelComponent',
      path: 'src/editor/ts/control-components/visual/label-component'
    }]],
    ['link', [{
      name: 'LinkControl',
      path: 'src/core/controls/visual/link-control'
    }, {
      name: 'LinkComponent',
      path: 'src/editor/ts/control-components/visual/link-component'
    }]],
    ['list', [{
      name: 'ListControl',
      path: 'src/core/controls/visual/list-control'
    }, {
      name: 'ListComponent',
      path: 'src/editor/ts/control-components/visual/list-component'
    }]],
    ['list-item', [{
      name: 'ListItemControl',
      path: 'src/core/controls/visual/list-control'
    }, {
      name: 'ContainerComponent',
      path: 'src/editor/ts/control-components/visual/container-component'
    }]],
    ['range', [{
      name: 'RangeControl',
      path: 'src/core/controls/visual/range-control'
    }, {
      name: 'RangeComponent',
      path: 'src/editor/ts/control-components/visual/range-component'
    }]],
    ['text-input', [{
      name: 'TextInputControl',
      path: 'src/core/controls/visual/text-input-control'
    }, {
      name: 'TextInputComponent',
      path: 'src/editor/ts/control-components/visual/text-input-component'
    }]]
  ]
);

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
