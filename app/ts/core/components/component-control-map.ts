import BaseControl from 'core/controls/base';

import ButtonComponent from 'core/components/visual/button';
import ContainerComponent from 'core/components/visual/container';
import LabelComponent from 'core/components/visual/label';


class ComponentControlMap {
  static getComponentType(control: BaseControl): Type {
    switch (control.type) {
      case 'button':
        return ButtonComponent;
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