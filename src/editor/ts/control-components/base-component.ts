import { Renderer, ViewContainerRef, DoCheck } from 'angular2/core';
import { Control } from '../../../core/controls/control';
import { ControlService } from '../../../core/services/control-service';
import { ComponentService } from '../services/component-service';

const CONTAINER_ONLY_STYLES = [
  'flex-basis', 'flex-grow', 'flex-shrink', 'margin'
];

export class BaseComponent implements DoCheck {
  public control: Control;

  protected dragEnterCounter: number = 0;
  protected renderer: Renderer;
  protected viewContainer: ViewContainerRef;

  private children: {
    controls: Control[],
    styles: { [key: string]: string; }[]
  };

  private controlStyles: { [key: string]: string; };

  constructor(
    renderer: Renderer, viewContainer: ViewContainerRef, control: Control
  ) {
    this.control = control;
    this.renderer = renderer;
    this.viewContainer = viewContainer;

    this.children = {
      controls: [],
      styles: []
    };

    this.controlStyles = {};
  }

  onClick(e: Event) {
    e.stopPropagation();
    e.preventDefault();

    ComponentService.selectComponent(this);
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

      this.control.addChild(
        ControlService.createByType(
          e.dataTransfer.getData(e.dataTransfer.types[0])
        )
      );

      this.dragEnterCounter = 0;
    }
  }

  acceptDrop(typesToDrop: string[]) {
    return false;
  }

  getPropertyValue(key: string) {
    return this.control.getProperty(key).getValue();
  }

  ngDoCheck() {
    if (this.control) {
      this.children.controls.length = this.children.styles.length = 0;

      this.control.getChildren().forEach((child) => {
        this.children.controls.push(child);
        this.children.styles.push(this.getControlContainerStyles(child));
      });

      this.control.meta.styles.forEach((style, styleKey) => {
        if (CONTAINER_ONLY_STYLES.indexOf(styleKey) < 0) {
          this.controlStyles[styleKey] = this.control.getStyle(
            styleKey
          ).getValue();
        }
      });
    }
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

  protected getControlContainerStyles(control: Control) {
    let containerStyles = <{ [key: string]: string; }>{};

    control.meta.styles.forEach((style, styleKey) => {
      if (CONTAINER_ONLY_STYLES.indexOf(styleKey) >= 0) {
        containerStyles[styleKey] = control.getStyle(styleKey).getValue();
      }
    });

    return containerStyles;
  }

  private domStringListToArray(list: DOMStringList) {
    let stringArray: string[] = [];
    for (let i = 0; i < list.length; i++) {
      stringArray[i] = list[i];
    }
    return stringArray;
  }
}
