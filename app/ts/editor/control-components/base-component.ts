/// <reference path="../../../../typings/tsd.d.ts" />
import { Control } from 'core/controls/control';
import { VisualControl } from 'core/controls/visual/visual-control';
import { ControlService } from 'services/control-service';

const CONTAINER_ONLY_STYLES = ['flex-basis', 'flex-grow', 'flex-shrink'];

export class BaseComponent {
  public control: Control;
  protected dragEnterCounter: number = 0;

  constructor(control: Control) {
    this.control = control;
  }

  onClick(e: Event) {
    e.stopPropagation();
    e.preventDefault();

    ControlService.selectControl(this.control);
  }

  onDragOver(e: DragEvent) {
    if (this.acceptDrop(e.dataTransfer.getData('text/plain'))) {
      e.preventDefault();
    }
  }

  onDragEnter(e: DragEvent) {
    if (this.acceptDrop(e.dataTransfer.getData('text/plain'))) {
      e.preventDefault();
      e.stopPropagation();
      this.dragEnterCounter++;
    }
  }

  onDragLeave(e: DragEvent) {
    if (this.acceptDrop(e.dataTransfer.getData('text/plain'))) {
      e.stopPropagation();
      this.dragEnterCounter--;
    }
  }

  onDrop(e: DragEvent) {
    let controlType = e.dataTransfer.getData('text/plain');
    if (this.acceptDrop(e.dataTransfer.getData('text/plain'))) {
      this.control.addChild(
        ControlService.createByType(controlType)
      );
      e.preventDefault();
      e.stopPropagation();

      this.dragEnterCounter = 0;
    }
  }

  acceptDrop(controlType: string) {
    return false;
  }

  getControlStyles() {
    if (VisualControl.isVisualControl(this.control)) {
      let visualControl = <VisualControl>this.control;

      let controlStyles = <{ [key: string]: string; }>{};
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
    let targetControl = control || this.control;
    if (VisualControl.isVisualControl(targetControl)) {
      let visualControl = <VisualControl>targetControl;

      let containerStyles = <{ [key: string]: string; }>{};
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
