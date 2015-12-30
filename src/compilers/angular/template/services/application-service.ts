import { Application } from '../../../../core/application';
import { Control } from '../../../../core/controls/control';
import { Trigger } from '../../../../core/triggers/trigger';

import { ActionService } from '../../../../core/services/action-service';
import { UtilsService } from '../../../../core/services/utils-service';
import { ControlService } from '../../../../core/services/control-service';

import {
  JSONApplicationCompiler
} from '../../../json/json-application-compiler';
import {
  IJSONAction,
  JSONActionCompiler
} from '../../../json/json-action-compiler';

import { application } from '../app-description';

export class ApplicationDatasource {
  items: Map<string, string>[];

  constructor(items: Map<string, string>[]) {
    this.items = items;
  }
}

class Initializer {
  static initialization: Promise<any>;

  static deserializeApplication(): Promise<Application> {
    return (new JSONApplicationCompiler()).decompile(application);
  }

  static deserializeDatasources(
    application: Application
  ): Map<string, ApplicationDatasource> {
    let datasourceControls = application.serviceRoot.getChildren().filter(
      (service: Control) => service.meta.type === 'datasource'
    );

    return new Map<string, ApplicationDatasource>(
      <[string, ApplicationDatasource][]>datasourceControls.map(
        (datasource: Control) => {
          let itemsJSON = datasource.getProperty('items').getValue();

          let items = itemsJSON ? JSON.parse(itemsJSON).map(
            (propertyMap: [string, string][]) => new Map(propertyMap)
          ) : [];

          return [datasource.id, new ApplicationDatasource(items)];
        }
      )
    );
  }
}

export class ApplicationService {
  private internalApplication: Application;
  private internalDatasources: Map<string, ApplicationDatasource>;

  private cloneOriginals = new Map<string, Control>();
  private actionCompiler = new JSONActionCompiler();

  constructor(application, datasources) {
    this.internalApplication = application;
    this.internalDatasources = datasources;
  }

  get application() {
    return this.internalApplication;
  }

  get datasources() {
    return this.internalDatasources;
  }

  cloneControl<TControl extends Control>(control: TControl): TControl {
    let clonedTriggers = control.triggers.map((trigger: Trigger) => {
      return new Trigger(
        trigger.name,
        trigger.condition,
        trigger.actions.map((action) => ActionService.clone(action))
      );
    });

    let clonedControl = ControlService.createByType<TControl>(
      control.meta.type, control.overrides.getRoot().clone(), clonedTriggers
    );

    if (clonedControl.overrides.name !== control.overrides.name) {
      clonedControl.overrides = clonedControl.overrides.find(
        control.overrides.name
      );
    }

    control.getChildren().forEach(
      (child) => clonedControl.addChild(this.cloneControl(child))
    );

    this.cloneOriginals.set(clonedControl.id, control);

    return clonedControl;
  }

  destroyClone(clonedControl: Control) {
    if (!this.cloneOriginals.has(clonedControl.id)) {
      throw new Error('Control is not a clone!');
    }

    this.cloneOriginals.delete(clonedControl.id);
  }

  getSource(clonedControl: Control) {
    return this.cloneOriginals.get(clonedControl.id);
  }

  performActions(control: Control, eventName: string) {
    let eventProperty = control.getEvent(eventName);
    let propertyValue = eventProperty && eventProperty.getValue();
    if (propertyValue) {
      (<IJSONAction[]>JSON.parse(propertyValue)).forEach((jsonAction) => {
        this.actionCompiler.decompile(jsonAction).then((action) => {
          action.perform(this.application);
        });
      });
    }
  }

  static initialize() {
    if (!Initializer.initialization) {
      Initializer.initialization = Initializer.deserializeApplication().then(
        (application) => {
          return new ApplicationService(
            application, Initializer.deserializeDatasources(application)
          );
        }
      );
    }

    return Initializer.initialization;
  }
}
