/// <reference path="../../../../typings/tsd.d.ts" />
import {
  bind,
  Component,
  ComponentRef,
  DynamicComponentLoader,
  Inject,
  Injector,
  NgFor,
  View,
  ViewContainerRef
} from 'angular2/angular2';

import { Control } from 'core/controls/control';
import { VisualControl } from 'core/controls/visual/visual-control';
import { IProperty, Property } from 'core/property';
import { IAction } from 'core/actions/action';

import PropertyEditor from 'editor/properties/property-editors/property-editor';
import { ActionList } from 'editor/properties/action-list';

import { ApplicationService } from 'services/application-service';
import { ControlService } from 'services/control-service';

@Component({
  selector: 'vargin-properties'
})
@View({
  template: `
    <section>
      <section>
        <header>Properties</header>
        <property-editor *ng-for="#property of activeProperties" [property]="property">
        </property-editor>
      </section>
      <section>
        <header>Styles</header>
        <property-editor *ng-for="#property of activeStyleProperties" [property]="property">
        </property-editor>
      </section>
      <section #eventssection>
        <header>Events</header>
        <ul>
          <li *ng-for="#eventProperty of activeEvents" (click)="toggleActionEditor(eventProperty)">
            {{ eventProperty.getName() }}
          </li>
        </ul>
      </section>
      <button (click)="removeControl()">Remove</button>
    </section>
  `,
  directives: [NgFor, PropertyEditor]
})
class VarginProperties {
  private activeProperties: Array<IProperty<any>> = [];
  private activeStyleProperties: Array<IProperty<string>> = [];
  private activeEvents: Array<IProperty<Array<IAction>>> = [];
  private activeControl: Control;
  private viewContainer: ViewContainerRef;
  private componentLoader: DynamicComponentLoader;
  private actionList: ComponentRef;

  constructor(
    @Inject(DynamicComponentLoader) componentLoader: DynamicComponentLoader,
    @Inject(ViewContainerRef) viewContainer: ViewContainerRef
  ) {
    ControlService.controlSelected.toRx().subscribeOnNext(
      this.onControlSelected.bind(this)
    );

    this.componentLoader = componentLoader;
    this.viewContainer = viewContainer;
  }

  private onControlSelected(control: Control) {
    this.reset();

    this.activeControl = control;

    control.meta.supportedProperties.forEach((property, propertyKey) => {
      this.activeProperties.push(control[propertyKey]);
    });

    control.meta.supportedEvents.forEach((property) => {
      this.activeEvents.push(property);
    });

    if (VisualControl.isVisualControl(control)) {
      (<VisualControl>control).styles.forEach((property) => {
        this.activeStyleProperties.push(property);
      });
    }
  }

  private toggleActionEditor(property: IProperty<Array<IAction>>) {
    var eventProperty = this.activeControl.events.get(property.getType());

    if (this.actionList) {
      this.actionList.instance.setProperty(eventProperty);
      return
    }

    this.componentLoader.loadIntoLocation(
      ActionList,
      this.viewContainer.element,
      'eventssection',
       Injector.resolve([bind(Property).toValue(eventProperty)])
    ).then((component: ComponentRef) => {
      this.actionList = component;
    });
  }

  private removeControl() {
    if (!this.activeControl) {
      return;
    }

    this.activeControl.remove();

    this.reset();
  }

  private reset() {
    this.activeControl = null;

    this.activeStyleProperties.length = 0;
    this.activeProperties.length = 0;
    this.activeEvents.length = 0;

    if (this.actionList) {
      this.actionList.dispose();
      this.actionList = null;
    }
  }
}

export default VarginProperties;