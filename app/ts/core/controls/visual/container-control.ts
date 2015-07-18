/// <reference path="../../../../../typings/tsd.d.ts" />
import { BaseVisualControl } from 'core/controls/visual/base-visual-control';

class ContainerControlProperties {
}

class ContainerControl extends BaseVisualControl<ContainerControlProperties> {
  public children: Array<BaseVisualControl<any>> = [];

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
}

export default ContainerControl;