/// <reference path="../../../../typings/tsd.d.ts" />
import { DomRenderer, ViewContainerRef} from 'angular2/angular2';
import { Control } from 'core/controls/control';
import { VisualControl } from 'core/controls/visual/visual-control';
import { ControlService } from 'services/control-service';

const CONTAINER_ONLY_STYLES = ['flex-basis', 'flex-grow', 'flex-shrink'];

export class BaseComponent {
  public control: Control;
  protected dragEnterCounter: number = 0;
  protected renderer: DomRenderer;
  protected viewContainer: ViewContainerRef;

  constructor(
    control: Control, renderer: DomRenderer, viewContainer: ViewContainerRef
  ) {
    this.control = control;
    this.renderer = renderer;
    this.viewContainer = viewContainer;

    ControlService.controlSelected.toRx().subscribeOnNext(
      this.onControlSelected.bind(this)
    );

    ControlService.controlUnselected.toRx().subscribeOnNext(
      this.onControlUnselected.bind(this)
    );
  }

  onClick(e: Event) {
    e.stopPropagation();
    e.preventDefault();

    ControlService.selectControl(this.control, this.viewContainer);
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
      this.control.addChild(
        ControlService.createByType(
          e.dataTransfer.getData(e.dataTransfer.types[0])
        )
      );
      e.preventDefault();
      e.stopPropagation();

      this.dragEnterCounter = 0;
    }
  }

  acceptDrop(typesToDrop: string[]) {
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

  private onControlSelected(
    controlDescription: { control: Control, view: ViewContainerRef }
  ) {
    this.renderer.setElementClass(
      controlDescription.view.element,
      'vargin-component_active',
      true
    );
  }

  private onControlUnselected(
    controlDescription: { control: Control, view: ViewContainerRef }
  ) {
    this.renderer.setElementClass(
      controlDescription.view.element,
      'vargin-component_active',
      false
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
