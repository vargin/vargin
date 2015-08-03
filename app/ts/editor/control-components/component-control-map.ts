/// <reference path="../../../../typings/tsd.d.ts" />
import { Type } from 'angular2/angular2';

import ButtonComponent from 'editor/control-components/visual/button-component';
import ContainerComponent from 'editor/control-components/visual/container-component';
import LabelComponent from 'editor/control-components/visual/label-component';
import RangeComponent from 'editor/control-components/visual/range-component';

class ComponentControlMap {
  static getComponentType(type: string): Type {
    switch (type) {
      case 'button':
        return ButtonComponent;
      case 'range':
        return RangeComponent;
      case 'label':
        return LabelComponent;
      case 'container':
        return ContainerComponent;
      default:
        throw new Error('Unsupported control type: ' + type);
    }
  }
}

export default ComponentControlMap;