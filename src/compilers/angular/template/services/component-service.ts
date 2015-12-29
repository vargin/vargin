import { Type } from 'angular2/core';

interface ITypeDescription {
  name: string;
  path: string;
}

const COMPONENT_CONFIG = new Map<string, ITypeDescription>(
  <[string, ITypeDescription][]>[
    ['button', {
      name: 'ButtonComponent',
      path: 'src/compilers/angular/template/components/button-component'
    }],
    ['container', {
      name: 'ContainerComponent',
      path: 'src/compilers/angular/template/components/container-component'
    }],
    ['label', {
      name: 'LabelComponent',
      path: 'src/compilers/angular/template/components/label-component'
    }],
    ['link', {
      name: 'LinkComponent',
      path: 'src/compilers/angular/template/components/link-component'
    }],
    ['list', {
      name: 'ListComponent',
      path: 'src/compilers/angular/template/components/list-component'
    }],
    ['list-item', {
      name: 'ContainerComponent',
      path: 'src/compilers/angular/template/components/container-component'
    }],
    ['range', {
      name: 'RangeComponent',
      path: 'src/compilers/angular/template/components/range-component'
    }],
    ['text-input', {
      name: 'TextInputComponent',
      path: 'src/compilers/angular/template/components/text-input-component'
    }]
  ]
);

export class ComponentService {
  static loadComponentType(controlType: string): Promise<Type> {
    let classDescription = COMPONENT_CONFIG.get(controlType);
    return System.import(classDescription.path).then(
      (module: any) => module[classDescription.name]
    );
  }
}
