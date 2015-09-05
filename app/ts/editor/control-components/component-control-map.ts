/// <reference path="../../../../typings/tsd.d.ts" />
import { Type } from 'angular2/angular2';

import ButtonComponent from 'editor/control-components/visual/button-component';
import ContainerComponent from 'editor/control-components/visual/container-component';
import LabelComponent from 'editor/control-components/visual/label-component';
import LinkComponent from 'editor/control-components/visual/link-component';
import RangeComponent from 'editor/control-components/visual/range-component';
import TextInputComponent from 'editor/control-components/visual/text-input-component';

class ComponentControlMap {
  static getComponentType(type: string): Type {
    switch (type) {
      case 'button':
        return ButtonComponent;
      case 'container':
        return ContainerComponent;
      case 'label':
        return LabelComponent;
      case 'link':
        return LinkComponent;
      case 'range':
        return RangeComponent;
      case 'text-input':
        return TextInputComponent;
      default:
        throw new Error('Unsupported control type: ' + type);
    }
  }
}

export default ComponentControlMap;
