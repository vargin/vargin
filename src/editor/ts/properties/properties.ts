import { Component, NgFor, NgIf, View } from 'angular2/angular2';

import { Control } from '../../../core/controls/control';
import { IProperty, Property } from '../../../core/property';

import { PropertyEditor } from './property-editors/property-editor';

import { ComponentService } from '../services/component-service';

@Component({
  selector: 'vargin-properties'
})
@View({
  template: `
    <section>
      <section class="expandable-group"
               *ng-if="!!groups.info.items.length"
               [attr.aria-expanded]="groups.info.expanded">
        <header class="expandable-group__header"
                (click)="groups.info.expanded = !groups.info.expanded">
          {{ groups.info.name }}
        </header>
        <ul class="expandable-group__list">
          <li class="expandable-group__item" *ng-for="#property of groups.info.items">
            <property-editor [property]="property"></property-editor>
          </li>
        </ul>
      </section>
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
  private groups: {
    info: {
      name: string,
      expanded: boolean,
      items: IProperty<any>[]
    },
    properties: {
      name: string,
      expanded: boolean,
      items: IProperty<string>[]
    },
    styles: {
      name: string,
      expanded: boolean,
      items: IProperty<string>[]
    },
    events: {
      name: string,
      expanded: boolean,
      items: IProperty<string>[]
    }
  } = {
    info: null,
    properties: null,
    styles: null,
    events: null
  };

  constructor() {
    ComponentService.controlSelected.subscribe(
      this.onControlSelected.bind(this)
    );

    ComponentService.controlUnselected.subscribe(
      this.onControlUnselected.bind(this)
    );

    this.groups.info = {
      name: 'Info',
      expanded: false,
      items: []
    };

    this.groups.properties = {
      name: 'Common Properties',
      expanded: false,
      items: []
    };

    this.groups.styles = {
      name: 'Appearance',
      expanded: false,
      items: []
    };

    this.groups.events = {
      name: 'Action',
      expanded: false,
      items: []
    };
  }

  private onControlSelected(control: Control) {
    this.reset();

    this.activeControl = control;

    this.groups.info.items.push(
      new Property('Id', control.id, 'read-only-string')
    );

    control.meta.properties.forEach((property, propertyKey) => {
      this.groups.properties.items.push(control.getProperty(propertyKey));
    });

    control.meta.styles.forEach((style, styleKey) => {
      this.groups.styles.items.push(control.getStyle(styleKey));
    });

    control.meta.events.forEach((property, eventKey) => {
      this.groups.events.items.push(control.getEvent(eventKey));
    });
  }

  private onControlUnselected() {
    this.reset();
  }

  private removeControl() {
    if (!this.activeControl) {
      return;
    }

    this.activeControl.remove();

    ComponentService.unselectCurrentComponent();
  }

  private reset() {
    this.activeControl = null;

    Object.keys(this.groups).forEach((groupKey) => {
      this.groups[groupKey].items = [];
    });
  }
}

export default VarginProperties;
