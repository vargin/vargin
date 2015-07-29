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
import PropertyEditor from 'editor/properties/property-editor';

import { ControlService } from 'services/control-service';

import { VarginActionEditor } from 'editor/properties/action-editor';

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
    </section>
  `,
  directives: [NgFor, PropertyEditor]
})
class VarginProperties {
  private activeProperties: Array<IProperty<any>>;
  private activeStyleProperties: Array<IProperty<string>>;
  private activeEvents: Array<IProperty<Array<IAction>>>;
  private activeControl: Control;
  private viewContainer: ViewContainerRef;
  private componentLoader: DynamicComponentLoader;
  private actionEditor: ComponentRef;

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

  onControlSelected(control: Control) {
    this.activeControl = control;

    if (this.actionEditor) {
      this.actionEditor.dispose();
      this.actionEditor = null;
    }

    this.activeProperties = [];
    control.meta.supportedProperties.forEach((property, propertyKey) => {
      this.activeProperties.push(control[propertyKey]);
    });

    this.activeEvents = [];
    control.meta.supportedEvents.forEach((property) => {
      this.activeEvents.push(property);
    });

    if ('styles' in control) {
      this.activeStyleProperties = [];
      (<VisualControl>control).styles.forEach((property) => {
        this.activeStyleProperties.push(property);
      });
    }
  }

  toggleActionEditor(property: IProperty<Array<IAction>>) {
    var eventProperty = this.activeControl.events.get(property.getType());

    if (this.actionEditor) {
      this.actionEditor.instance.property = eventProperty;
      return
    }

    this.componentLoader.loadIntoLocation(
      VarginActionEditor,
      this.viewContainer.element,
      'eventssection',
       Injector.resolve([bind(Property).toValue(eventProperty)])
    ).then((component: ComponentRef) => {
      this.actionEditor = component;
    });
  }
}

export default VarginProperties;