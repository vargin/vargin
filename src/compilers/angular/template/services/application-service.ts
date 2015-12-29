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
  IJSONControl,
  JSONControlCompiler
} from '../../../json/json-control-compiler';
import {
  IJSONAction,
  JSONActionCompiler
} from '../../../json/json-action-compiler';

import { application, services } from '../app-description';

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

  static deserializeDatasources(): Promise<Map<string, ApplicationDatasource>> {
    let serializedDatasources = services.filter(
      (service: IJSONControl) => service.type === 'datasource'
    );

    let datasources = new Map<string, ApplicationDatasource>();

    if (!serializedDatasources.length) {
      return Promise.resolve(datasources);
    }

    let jsonControlCompiler = new JSONControlCompiler();

    return Promise.all(
      serializedDatasources.map((serializedDatasource) => {
        return jsonControlCompiler.decompile(serializedDatasource).then(
          (control: Control) => {
            let itemsJSON = control.getProperty('items').getValue();

            let items = itemsJSON ? JSON.parse(itemsJSON).map(
              (propertyMap: [string, string][]) => new Map(propertyMap)
            ) : [];

            datasources.set(
              serializedDatasource.id, new ApplicationDatasource(items)
            );
          }
        );
      })
    ).then(() => {
      return datasources;
    });
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
      Initializer.initialization = Promise.all<any>([
        Initializer.deserializeApplication(),
        Initializer.deserializeDatasources()
      ]).then(([application, datasources]) => {
        return new ApplicationService(application, datasources);
      });
    }

    return Initializer.initialization;
  }
}
