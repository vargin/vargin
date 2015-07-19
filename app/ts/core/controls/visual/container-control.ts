/// <reference path="../../../../../typings/tsd.d.ts" />
import BaseControl from 'core/controls/base-control';
import { BaseVisualControl } from 'core/controls/visual/base-visual-control';

class ContainerControlProperties {
}

class ContainerControl extends BaseVisualControl<ContainerControlProperties> {
  public children: Array<BaseControl<any>> = [];

  constructor(
    properties?: ContainerControlProperties,
    styles?: { [key: string]: string; }
  ) {
    super(
      'container',
      'Container',
      'Component container',
      properties || new ContainerControlProperties(),
      styles
    );
  }

  clone() {
    return new ContainerControl(this.properties, this.getStyleObject());
  }
}

export default ContainerControl;