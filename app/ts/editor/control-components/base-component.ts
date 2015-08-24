/// <reference path="../../../../typings/tsd.d.ts" />
import { Control } from 'core/controls/control';
import { VisualControl } from 'core/controls/visual/visual-control';
import { ControlService } from 'services/control-service';

const CONTAINER_ONLY_STYLES = ['flex-basis', 'flex-grow', 'flex-shrink'];

export class BaseComponent {
  public control: Control;

  constructor(control: Control) {
    this.control = control;
  }

  onClick(e) {
    e.stopPropagation();
    e.preventDefault();

    ControlService.selectControl(this.control);
  }

  getControlStyles() {
    if (VisualControl.isVisualControl(this.control)) {
      var visualControl = <VisualControl>this.control;

      var controlStyles = <{ [key: string]: string; }>{};
      visualControl.styles.forEach((styleProperty, styleKey) => {
        if (CONTAINER_ONLY_STYLES.indexOf(styleKey) < 0) {
          controlStyles[styleKey] = styleProperty.getValue();
        }
      });

      return controlStyles;
    }

    return null;
  }

  getContainerStyles(control?: Control) {
    var targetControl = control || this.control;
    if (VisualControl.isVisualControl(targetControl)) {
      var visualControl = <VisualControl>targetControl;

      var containerStyles = <{ [key: string]: string; }>{};
      CONTAINER_ONLY_STYLES.forEach((styleKey) => {
        if (visualControl.styles.has(styleKey)) {
          containerStyles[styleKey] = visualControl.styles.get(
            styleKey
          ).getValue();
        }
      });

      return containerStyles;
    }

    return null;
  }
}
