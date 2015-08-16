/// <reference path="../../../../../typings/tsd.d.ts" />
import {
  bind,
  Component,
  ComponentRef,
  DynamicComponentLoader,
  Inject,
  Injector,
  View,
  ViewContainerRef
} from 'angular2/angular2';

import { IProperty, Property } from 'core/property';
import { IAction } from 'core/actions/action';

import { ActionList } from 'editor/properties/action-list';

@Component({
  selector: 'event-property-editor',
  properties: ['property']
})
@View({
  template: `
    <label #actioncontainer>{{property.getName()}} &nbsp;
      <button type="button" (click)="showActionList()">...</button>
    </label>`
})
class EventPropertyEditor {
  private property: IProperty<IAction[]>;
  private componentLoader: DynamicComponentLoader;
  private viewContainer: ViewContainerRef;
  private actionList: ComponentRef;

  constructor(
    @Inject(DynamicComponentLoader) componentLoader: DynamicComponentLoader,
    @Inject(ViewContainerRef) viewContainer: ViewContainerRef,
    @Inject(Property) property: IProperty<IAction[]>
  ) {
    this.componentLoader = componentLoader;
    this.viewContainer = viewContainer;
    this.property = property;
  }

  private showActionList() {
    if (this.actionList) {
      this.actionList.dispose();
      this.actionList = null;
      return
    }

    this.componentLoader.loadIntoLocation(
      ActionList,
      this.viewContainer.element,
      'actioncontainer',
      Injector.resolve([bind(Property).toValue(this.property)])
    ).then((actionList) => this.actionList = actionList);
  }
}

export default EventPropertyEditor;