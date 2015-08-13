/// <reference path="../../../../typings/tsd.d.ts" />
import {
  bind,
  Component,
  ComponentRef,
  DynamicComponentLoader,
  Inject,
  Injector,
 /* LifecycleEvent,*/
  NgFor,
  Optional,
  View,
  ViewContainerRef
} from 'angular2/angular2';
import { IAction, Action } from 'core/actions/action';
import { IProperty, Property } from 'core/property';

import { ActionEditor } from 'editor/properties/action-editor';

import { ChangePropertyAction } from 'core/actions/change-property-action';

@Component({
  selector: 'vargin-action-list'
  /*properties: ['property'],
  lifecycle: [LifecycleEvent.onChange]*/
})
@View({
  template: `
    <section>
      <header>Actions for "{{ property.getName() }}"</header>
      <ul>
        <li *ng-for="#action of property.getValue()">
          {{ action.name }} <button (click)="editAction(action)">Edit</button>
        </li>
        <li>
          <select #newaction (change)="addNewAction(newaction)">
            <option value="default" selected="{{isDefaultSelected}}">
              (+ Choose new action)
            </option>
            <option value="change-property-action">Change property</option>
          </select>
        </li>
      </ul>
      <section #actioneditor></section>
    </section>
  `,
  directives: [NgFor]
})
export class ActionList {
  private property: IProperty<Array<IAction>>;
  private isDefaultSelected: boolean = true;
  private viewContainer: ViewContainerRef;
  private componentLoader: DynamicComponentLoader;
  private actionEditor: ComponentRef;

  constructor(
    @Inject(DynamicComponentLoader) componentLoader: DynamicComponentLoader,
    @Inject(ViewContainerRef) viewContainer: ViewContainerRef,
    @Optional() @Inject(Property) property?: IProperty<Array<IAction>>
  ) {
    this.componentLoader = componentLoader;
    this.viewContainer = viewContainer;
    this.property = property;
  }

  addNewAction(newActionSelect) {
    switch (newActionSelect.value) {
      case 'change-property-action':
        this.property.getValue().push(
          new ChangePropertyAction()
        );
        break;
      case 'default':
        return;
      default:
        throw new Error('Unsupported action ' + newActionSelect.value);
    }

    newActionSelect.value = 'default';
  }

  editAction(action: IAction) {
    if (this.actionEditor) {
      this.actionEditor.instance.action = action;
      return
    }

    this.componentLoader.loadIntoLocation(
      ActionEditor,
      this.viewContainer.element,
      'actioneditor',
      Injector.resolve([bind(Action).toValue(action)])
    ).then((component: ComponentRef) => {
      this.actionEditor = component;
    });
  }

  setProperty(property: IProperty<Array<IAction>>) {
    if (this.actionEditor) {
      this.actionEditor.dispose();
      this.actionEditor = null;
    }

    this.property = property;
  }

  /*onChange() {
    if (this.actionEditor) {
      this.actionEditor.dispose();
      this.actionEditor = null;
    }
  }*/
}