import {
  ChangeDetectorRef,
  ComponentRef,
  DoCheck,
  DynamicComponentLoader,
  Injector,
  IterableDiffer,
  IterableDiffers,
  OnChanges,
  provide,
  Type,
  ViewContainerRef
} from 'angular2/core';

import { Control } from '../../../../core/controls/control';
import { PromiseQueue } from '../../../../core/tools/promise-queue';
import { ApplicationService } from '../services/application-service';
import { ComponentService } from '../services/component-service';

export class BaseComponent implements DoCheck {
  private internalControl: Control;
  private overridesToCssClass = new Map<string, string>();

  protected cssClass: string;
  protected applicationService: ApplicationService;

  private viewContainer: ViewContainerRef;
  private iterableDiffers: IterableDiffers;
  private changeDetector: ChangeDetectorRef;
  private loader: DynamicComponentLoader;

  private nestedComponents: {
    differ: IterableDiffer,
    components: Map<Control, ComponentRef>
  };

  constructor(
    viewContainer: ViewContainerRef,
    iterableDiffers: IterableDiffers,
    changeDetector: ChangeDetectorRef,
    loader: DynamicComponentLoader,
    applicationService: ApplicationService,
    control?: Control
  ) {
    this.viewContainer = viewContainer;
    this.iterableDiffers = iterableDiffers;
    this.changeDetector = changeDetector;
    this.loader = loader;

    this.applicationService = applicationService;

    this.control = control;
  }

  set control(control) {
    this.internalControl = control;

    if (control && control.canHaveChildren()) {
      this.nestedComponents = {
        differ: this.iterableDiffers.find(control.getChildren()).create(
          this.changeDetector
        ),
        components: new Map<Control, ComponentRef>()
      };
    }
  }

  get control() {
    return this.internalControl;
  }

  protected onControlAction(eventName: string) {
    this.applicationService.performActions(this.internalControl, eventName);
  }

  ngDoCheck() {
    if (!this.internalControl) {
      return;
    }

    this.checkChildren();
    this.checkCssClass();
  }

  private checkChildren() {
    if (!this.internalControl.canHaveChildren()) {
      return;
    }

    let changes = this.nestedComponents.differ.diff(
      this.internalControl.getChildren()
    );
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

  private checkCssClass() {
    // Current override name we should read for the current control.
    let cssClass = this.overridesToCssClass.get(
      this.internalControl.overrides.name
    );

    if (!cssClass) {
      let cssClasses = [`vargin-${this.internalControl.meta.type}`];

      // CSS classes are generated only for the source control (in case of lists,
      // tables and etc - template control), so we should get source control and
      // use its ID in CSS class mapping.
      let sourceControl = this.applicationService.getSource(
        this.internalControl
      ) || this.internalControl;

      let overrides = this.internalControl.overrides;
      while (overrides && overrides.name !== '__predefined__') {
        cssClasses.push(`vargin-${sourceControl.id}--${overrides.name}`);
        overrides = overrides.parent;
      }

      cssClass = cssClasses.join(' ');
      this.overridesToCssClass.set(
        this.internalControl.overrides.name, cssClass
      );
    }

    this.cssClass = cssClass;
  }
}
