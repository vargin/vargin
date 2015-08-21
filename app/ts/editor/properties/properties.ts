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
      <section class="expandable-group" *ng-for="#group of groups" [attr.aria-expanded]="group.expanded">
        <header class="expandable-group__header" (click)="group.expanded = !group.expanded">
          {{ group.name }}
        </header>
        <ul class="expandable-group__list">
          <li class="expandable-group__item" *ng-for="#property of group.items">
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
  private groups: IExpandableGroup[];
  private activeControl: Control;
  private actionEditor: ComponentRef;
  private viewContainer: ViewContainerRef;
  private componentLoader: DynamicComponentLoader;

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
  }

  private onControlSelected(control: Control) {
    this.reset();

    this.activeControl = control;

    if (control.meta.supportedProperties.size) {
      var propertyGroup = {
        name: 'Properties',
        expanded: false,
        items: []
      };

      control.meta.supportedProperties.forEach((property, propertyKey) => {
        propertyGroup.items.push(control[propertyKey]);
      });

      this.groups.push(propertyGroup);
    }

    if (VisualControl.isVisualControl(control)) {
      var styleGroup = {
        name: 'Styles',
        expanded: false,
        items: []
      };

      (<VisualControl>control).styles.forEach((property) => {
        styleGroup.items.push(property);
      });

      this.groups.push(styleGroup);
    }

    if (control.meta.supportedEvents.size) {
      var eventGroup = {
        name: 'Events',
        expanded: false,
        items: []
      };

      control.meta.supportedEvents.forEach((property) => {
        eventGroup.items.push(control.events.get(property.getType()));
      });

      this.groups.push(eventGroup);
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
      Injector.resolve([bind(Action).toValue(action)])
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

  private reset() {
    this.activeControl = null;

    this.groups = [];

    if (this.actionEditor) {
      this.actionEditor.dispose();
      this.actionEditor = null;
    }
  }
}

export default VarginProperties;