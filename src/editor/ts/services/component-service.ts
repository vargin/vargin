import { EventEmitter, Type } from 'angular2/angular2';
import { ControlMetadata } from '../../../core/controls/control-metadata';

import { Control } from '../../../core/controls/control';
import { IOverrides } from '../../../core/overrides/overrides';

import { BaseComponent } from '../control-components/base-component';

import { UtilsService } from '../../../core/services/utils-service';

interface ITypeDescription {
  name: string;
  path: string;
}

const COMPONENT_CONFIG = new Map<string, ITypeDescription>(
  <[string, ITypeDescription][]>[
    ['button', {
      name: 'ButtonComponent',
      path: 'src/editor/ts/control-components/visual/button-component'
    }],
    ['container', {
      name: 'ContainerComponent',
      path: 'src/editor/ts/control-components/visual/container-component'
    }],
    ['datasource', {
      name: 'DatasourceComponent',
      path: 'src/editor/ts/control-components/service/datasource-component'
    }],
    ['label', {
      name: 'LabelComponent',
      path: 'src/editor/ts/control-components/visual/label-component'
    }],
    ['link', {
      name: 'LinkComponent',
      path: 'src/editor/ts/control-components/visual/link-component'
    }],
    ['list', {
      name: 'ListComponent',
      path: 'src/editor/ts/control-components/visual/list-component'
    }],
    ['list-item', {
      name: 'ContainerComponent',
      path: 'src/editor/ts/control-components/visual/container-component'
    }],
    ['range', {
      name: 'RangeComponent',
      path: 'src/editor/ts/control-components/visual/range-component'
    }],
    ['text-input', {
      name: 'TextInputComponent',
      path: 'src/editor/ts/control-components/visual/text-input-component'
    }]
  ]
);

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

  static loadComponentType(controlType: string): Promise<Type> {
    let classDescription = COMPONENT_CONFIG.get(controlType);
    return System.import(classDescription.path).then(
      (module: any) => module[classDescription.name]
    );
  }
}
