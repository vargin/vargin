import {
  Component,
  ComponentRef,
  DynamicComponentLoader,
  Inject,
  Injector,
  provide,
  View,
  ViewContainerRef
} from 'angular2/angular2';

import { IProperty, Property } from '../../../../core/property';
import { IAction } from '../../../../core/actions/action';

import { ActionList } from '../action-list';

@Component({
  selector: 'event-property-editor',
  properties: ['property']
})
@View({
  template: `
    <label class="vargin-property-editor vargin-property-editor-event" #actioncontainer>
      <span class="vargin-property-editor__label" (click)="showActionList()">
        {{property.getName()}}
      </span>
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
      return;
    }

    this.componentLoader.loadIntoLocation(
      ActionList,
      this.viewContainer.element,
      'actioncontainer',
      Injector.resolve([provide(Property, { useValue: this.property })])
    ).then((actionList) => this.actionList = actionList);
  }
}

export default EventPropertyEditor;
