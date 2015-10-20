/// <reference path="../../../../typings/tsd.d.ts" />
import { Renderer, ViewContainerRef} from 'angular2/angular2';
import { Control } from 'core/controls/control';
import { VisualControl } from 'core/controls/visual/visual-control';
import { ControlService } from 'services/control-service';

const CONTAINER_ONLY_STYLES = [
  'flex-basis', 'flex-grow', 'flex-shrink', 'margin'
];

export class BaseComponent {
  public control: Control;
  protected dragEnterCounter: number = 0;
  protected renderer: Renderer;
  protected viewContainer: ViewContainerRef;

  constructor(
    renderer: Renderer, viewContainer: ViewContainerRef, control: Control
  ) {
    this.control = control;
    this.renderer = renderer;
    this.viewContainer = viewContainer;
  }

  onClick(e: Event) {
    e.stopPropagation();
    e.preventDefault();

    ControlService.selectComponent(this);
  }

  onDragOver(e: DragEvent) {
    if (this.acceptDrop(this.domStringListToArray(e.dataTransfer.types))) {
      e.preventDefault();
    }
  }

  onDragEnter(e: DragEvent) {
    if (this.acceptDrop(this.domStringListToArray(e.dataTransfer.types))) {
      e.preventDefault();
      e.stopPropagation();
      this.dragEnterCounter++;
    }
  }

  onDragLeave(e: DragEvent) {
    if (this.acceptDrop(this.domStringListToArray(e.dataTransfer.types))) {
      e.stopPropagation();
      this.dragEnterCounter--;
    }
  }

  onDrop(e: DragEvent) {
    if (this.acceptDrop(this.domStringListToArray(e.dataTransfer.types))) {
      e.preventDefault();
      e.stopPropagation();

      ControlService.createByType(
        e.dataTransfer.getData(e.dataTransfer.types[0])
      ).then((control: Control) => {
        this.control.addChild(control);
      });

      this.dragEnterCounter = 0;
    }
  }

  acceptDrop(typesToDrop: string[]) {
    return false;
  }

  getControlStyles() {
    if (this.control && VisualControl.isVisualControl(this.control)) {
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
    if (targetControl && VisualControl.isVisualControl(targetControl)) {
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

  getChildren() {
    return this.control ? this.control.getChildren() : [];
  }

  select() {
    this.renderer.setElementClass(
      this.viewContainer.element, 'vargin-component_active', true
    );
  }

  unselect() {
    this.renderer.setElementClass(
      this.viewContainer.element, 'vargin-component_active', false
    );
  }

  private domStringListToArray(list: DOMStringList) {
    let stringArray: string[] = [];
    for (let i = 0; i < list.length; i++) {
      stringArray[i] = list[i];
    }
    return stringArray;
  }
}
