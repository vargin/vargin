import BaseControl from 'core/controls/base-control';

import ButtonComponent from 'core/components/visual/button-component';
import ContainerComponent from 'core/components/visual/container-component';
import LabelComponent from 'core/components/visual/label-component';
import RangeComponent from 'core/components/visual/range-component';


class ComponentControlMap {
  static getComponentType(control: BaseControl<any>): Type {
    switch (control.type) {
      case 'button':
        return ButtonComponent;
      case 'range':
        return RangeComponent;
      case 'label':
        return LabelComponent;
      case 'container':
        return ContainerComponent;
      default:
        throw new Error('Unsupported control type: ' + control.type);
    }
  }
}

export default ComponentControlMap;