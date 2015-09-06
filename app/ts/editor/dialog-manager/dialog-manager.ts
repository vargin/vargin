/// <reference path="../../../../typings/tsd.d.ts" />
import {
  bind,
  Component,
  ComponentRef,
  DomRenderer,
  DynamicComponentLoader,
  Inject,
  View,
  ViewContainerRef
} from 'angular2/angular2';

import { IDialogRequest, DialogService } from 'services/dialog-service';

@Component({
  selector: 'dialog-manager'
})
@View({
  template: `<section class="dialog-manager__container" (click)="close()">
               <div class="dialog-manager__content">
                 <div #placeholder hidden></div>
               </div>
             </section>`
})
export class DialogManager {
  private renderer: DomRenderer;
  private viewContainer: ViewContainerRef;
  private componentLoader: DynamicComponentLoader;
  private instance: ComponentRef;

  constructor(
    @Inject(DomRenderer) renderer: DomRenderer,
    @Inject(DynamicComponentLoader) componentLoader: DynamicComponentLoader,
    @Inject(ViewContainerRef) viewContainer: ViewContainerRef
  ) {
    this.renderer = renderer;
    this.componentLoader = componentLoader;
    this.viewContainer = viewContainer;

    DialogService.onRequest.toRx().subscribeOnNext(
      this.onDialogRequested.bind(this)
    );
  }

  close() {
    if (this.instance) {
      this.renderer.setElementClass(
        this.viewContainer.element, 'dialog-manager_visible', false
      );
      this.instance.dispose();
      this.instance = null;
    }
  }

  private onDialogRequested(dialogRequest: IDialogRequest) {
    this.close();

    this.componentLoader.loadIntoLocation(
      dialogRequest.component,
      this.viewContainer.element,
      'placeholder',
      dialogRequest.bindings
    ).then((component: ComponentRef) => {
      this.instance = component;
      this.renderer.setElementClass(
        this.viewContainer.element, 'dialog-manager_visible', true
      );
    });
  }
}
