/// <reference path="../../../../typings/tsd.d.ts" />
import {
  bind,
  Component,
  ComponentRef,
  DynamicComponentLoader,
  Inject,
  Injector,
  Renderer,
  View,
  ViewContainerRef
} from 'angular2/angular2';

import { IDialogRequest, DialogService } from 'services/dialog-service';

interface IDialogDescriptor {
  uuid: string;
  component: ComponentRef;
}

@Component({
  selector: 'dialog-manager'
})
@View({
  template: `<section class="dialog-manager__container" (click)="close()">
               <div class="dialog-manager__content" (click)="$event.stopPropagation()">
                 <div #placeholder hidden></div>
               </div>
             </section>`
})
export class DialogManager {
  private renderer: Renderer;
  private viewContainer: ViewContainerRef;
  private componentLoader: DynamicComponentLoader;
  private instances: IDialogDescriptor[] = [];

  constructor(
    @Inject(Renderer) renderer: Renderer,
    @Inject(DynamicComponentLoader) componentLoader: DynamicComponentLoader,
    @Inject(ViewContainerRef) viewContainer: ViewContainerRef
  ) {
    this.renderer = renderer;
    this.componentLoader = componentLoader;
    this.viewContainer = viewContainer;

    DialogService.onRequest.observer({
      next: this.onDialogRequested.bind(this)
    });
  }

  close() {
    if (this.instances.length) {
      let instance = this.instances.pop();
      instance.component.dispose();
      DialogService.hide(instance.uuid);
    }

    if (this.instances.length === 0) {
      this.renderer.setElementClass(
        this.viewContainer.element, 'dialog-manager_visible', false
      );
    }
  }

  private onDialogRequested(dialogRequest: IDialogRequest) {
    this.componentLoader.loadIntoLocation(
      dialogRequest.component,
      this.viewContainer.element,
      'placeholder',
      Injector.resolve([
        ...dialogRequest.bindings,
        bind('dispose').toValue(() => this.close())
      ])
    ).then((component: ComponentRef) => {
      this.instances.push({ component, uuid: dialogRequest.uuid });

      if (this.instances.length === 1) {
        this.renderer.setElementClass(
          this.viewContainer.element, 'dialog-manager_visible', true
        );
      }
    });
  }
}
