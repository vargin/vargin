/// <reference path="../../../../typings/tsd.d.ts" />
import {
  bind,
  Component,
  ComponentRef,
  DynamicComponentLoader,
  Inject,
  Injector,
  NgFor,
  NgIf,
  View,
  ViewContainerRef
} from 'angular2/angular2';

import { Control } from 'core/controls/control';
import { VisualControl } from 'core/controls/visual/visual-control';
import { IProperty, Property } from 'core/property';
import { IAction, Action } from 'core/actions/action';

import PropertyEditor from 'editor/properties/property-editors/property-editor';
import { ActionEditor } from 'editor/properties/action-editor';

import { ApplicationService } from 'services/application-service';
import { ControlService } from 'services/control-service';
import { ActionService } from 'services/action-service';

import { IExpandableGroup } from 'editor/expandable-groups/expandable-groups';

@Component({
  selector: 'vargin-properties'
})
@View({
  template: `
    <section #container>
      <section class="expandable-group"
               *ng-if="!!groups.properties.items.length"
               [attr.aria-expanded]="groups.properties.expanded">
        <header class="expandable-group__header"
                (click)="groups.properties.expanded = !groups.properties.expanded">
          {{ groups.properties.name }}
        </header>
        <ul class="expandable-group__list">
          <li class="expandable-group__item" *ng-for="#property of groups.properties.items">
            <property-editor [property]="property"></property-editor>
          </li>
        </ul>
      </section>
      <section class="expandable-group"
               *ng-if="!!groups.styles.items.length"
               [attr.aria-expanded]="groups.styles.expanded">
        <header class="expandable-group__header"
                (click)="groups.styles.expanded = !groups.styles.expanded">
          {{ groups.styles.name }}
        </header>
        <ul class="expandable-group__list">
          <li class="expandable-group__item" *ng-for="#property of groups.styles.items">
            <property-editor [property]="property"></property-editor>
          </li>
        </ul>
      </section>
      <section class="expandable-group"
               *ng-if="!!groups.events.items.length"
               [attr.aria-expanded]="groups.events.expanded">
        <header class="expandable-group__header"
                (click)="groups.events.expanded = !groups.events.expanded">
          {{ groups.events.name }}
        </header>
        <ul class="expandable-group__list">
          <li class="expandable-group__item" *ng-for="#property of groups.events.items">
            <property-editor [property]="property"></property-editor>
          </li>
        </ul>
      </section>
      <button class="vargin-properties__remove-control" *ng-if="!!activeControl"
              (click)="removeControl()">
        Remove control
      </button>
      <div class="vargin-properties_empty" *ng-if="!activeControl">
        (Select control...)
      </div>
    </section>
  `,
  directives: [NgFor, NgIf, PropertyEditor]
})
class VarginProperties {
  private activeControl: Control;
  private actionEditor: ComponentRef;
  private viewContainer: ViewContainerRef;
  private componentLoader: DynamicComponentLoader;
  private groups: {
    properties: IExpandableGroup,
    styles: IExpandableGroup,
    events: IExpandableGroup
  } = {
    properties: null,
    styles: null,
    events: null
  };

  constructor(
    @Inject(DynamicComponentLoader) componentLoader: DynamicComponentLoader,
    @Inject(ViewContainerRef) viewContainer: ViewContainerRef
  ) {
    this.componentLoader = componentLoader;
    this.viewContainer = viewContainer;

    ControlService.controlSelected.toRx().subscribeOnNext(
      this.onControlSelected.bind(this)
    );

    ActionService.actionSelected.toRx().subscribeOnNext(
      this.onActionSelected.bind(this)
    );

    this.groups.properties = {
      name: 'Properties',
      expanded: false,
      items: []
    };

    this.groups.styles = {
      name: 'Styles',
      expanded: false,
      items: []
    };

    this.groups.events = {
      name: 'Events',
      expanded: false,
      items: []
    };
  }

  private onControlSelected(control: Control) {
    this.reset();

    this.activeControl = control;

    if (control.meta.supportedProperties.size) {
      control.meta.supportedProperties.forEach((property, propertyKey) => {
        this.groups.properties.items.push(control[propertyKey]);
      });
    }

    if (VisualControl.isVisualControl(control)) {
      (<VisualControl>control).styles.forEach((property) => {
        this.groups.styles.items.push(property);
      });
    }

    if (control.meta.supportedEvents.size) {
      control.meta.supportedEvents.forEach((property) => {
        this.groups.events.items.push(control.events.get(property.getType()));
      });
    }
  }

  private onActionSelected(action: IAction) {
    if (this.actionEditor) {
      this.actionEditor.instance.setAction(action);
      return
    }

    this.componentLoader.loadIntoLocation(
      ActionEditor,
      this.viewContainer.element,
      'container',
      Injector.resolve([
        bind(Action).toValue(action),
        bind(Function).toValue(this.disposeActionEditor.bind(this))
      ])
    ).then((component: ComponentRef) => {
      this.actionEditor = component;
    });
  }

  private removeControl() {
    if (!this.activeControl) {
      return;
    }

    this.activeControl.remove();

    this.reset();
  }

  private disposeActionEditor() {
    if (this.actionEditor) {
      this.actionEditor.dispose();
      this.actionEditor = null;
    }
  }

  private reset() {
    this.activeControl = null;

    Object.keys(this.groups).forEach((groupKey) => {
      this.groups[groupKey].items = [];
    });

   this.disposeActionEditor();
  }
}

export default VarginProperties;