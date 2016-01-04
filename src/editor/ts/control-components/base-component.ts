import {
  ChangeDetectorRef,
  ComponentRef,
  DoCheck,
  DynamicComponentLoader,
  Injector,
  IterableDiffer,
  IterableDiffers,
  provide,
  Renderer,
  Type,
  ViewContainerRef
} from 'angular2/core';
import { Control } from '../../../core/controls/control';
import { ControlService } from '../../../core/services/control-service';
import { ComponentService } from '../services/component-service';
import { PromiseQueue } from '../../../core/tools/promise-queue';

export class BaseComponent implements DoCheck {
  public control: Control;

  protected dragEnterCounter: number = 0;
  protected renderer: Renderer;
  protected viewContainer: ViewContainerRef;
  private iterableDiffers: IterableDiffers;
  private changeDetector: ChangeDetectorRef;
  private loader: DynamicComponentLoader;

  private nestedComponents: {
    differ: IterableDiffer,
    components: Map<Control, ComponentRef>
  };

  private controlStyle: string;

  constructor(
    renderer: Renderer,
    viewContainer: ViewContainerRef,
    iterableDiffers: IterableDiffers,
    changeDetector: ChangeDetectorRef,
    loader: DynamicComponentLoader,
    control: Control
  ) {
    this.control = control;
    this.renderer = renderer;
    this.viewContainer = viewContainer;

    this.iterableDiffers = iterableDiffers;
    this.changeDetector = changeDetector;
    this.loader = loader;
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
    if (!this.control) {
      return;
    }

    this.checkChildren();
    this.checkStyles();
  }

  select() {
    this.renderer.setElementClass(
      this.viewContainer.element.nativeElement, 'vargin-component_active', true
    );
  }

  unselect() {
    this.renderer.setElementClass(
      this.viewContainer.element.nativeElement, 'vargin-component_active', false
    );
  }

  protected getChildren() {
    return this.control.getChildren();
  }

  private checkChildren() {
    if (!this.control.canHaveChildren()) {
      return;
    }

    if (!this.nestedComponents) {
      this.nestedComponents = {
        differ: this.iterableDiffers.find(this.getChildren()).create(
          this.changeDetector
        ),
        components: new Map<Control, ComponentRef>()
      };

      return;
    }

    let changes = this.nestedComponents.differ.diff(this.getChildren());
    let childrenToRemove: Control[];
    let childrenToInsert: Control[];

    if (changes) {
      changes.forEachRemovedItem((removedRecord) => {
        if (!childrenToRemove) {
          childrenToRemove = [];
        }

        childrenToRemove.push(removedRecord.item);
      });

      changes.forEachAddedItem((addedRecord) => {
        if (!childrenToInsert) {
          childrenToInsert = [];
        }

        childrenToInsert.push(addedRecord.item);
      });
    }

    if (childrenToRemove) {
      childrenToRemove.forEach((control: Control) => {
        this.nestedComponents.components.get(control).dispose();
        this.nestedComponents.components.delete(control);
      });
    }

    if (childrenToInsert) {
      let promiseQueue = new PromiseQueue();
      childrenToInsert.forEach((control: Control) => {
        promiseQueue.enqueue(() => {
          return ComponentService.loadComponentType(control.meta.type).then(
            (type: Type) => {
              return this.loader.loadIntoLocation(
                type,
                this.viewContainer.element,
                'container',
                Injector.resolve([provide(Control, { useValue: control })])
              );
            }
          ).then((component: ComponentRef) => {
            this.nestedComponents.components.set(control, component);
          });
        });
      });
    }
  }

  private checkStyles() {
    this.controlStyle = '';
    this.control.meta.styles.forEach((meta, key) => {
      let value = this.control.getStyle(key).getValue();

      this.controlStyle += `${key}: ${value};`;
    });
  }

  private domStringListToArray(list: DOMStringList) {
    let stringArray: string[] = [];
    for (let i = 0; i < list.length; i++) {
      stringArray[i] = list[i];
    }
    return stringArray;
  }
}
