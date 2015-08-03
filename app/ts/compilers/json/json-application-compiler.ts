import { Application } from 'core/application';
import { ApplicationPage } from 'core/application-page';
import { IAction } from 'core/actions/action';


import { Control } from 'core/controls/control';
import { VisualControl } from 'core/controls/visual/visual-control';
import {
  VisualControlMetadata
} from 'core/controls/visual/visual-control-metadata';

import { ControlService } from 'services/control-service';
import { ActionService } from 'services/action-service';

import { ICompiler } from 'compilers/compiler';
import { IApplicationCompiler } from 'compilers/application-compiler';
import { IControlCompiler } from 'compilers/control-compiler';

interface IPlainAction {
  type: string;
  properties: Iterable<[string, string]>;
}

interface IPlainControl {
  type: string;
  id?: string;
  children?: IPlainControl[];
  parameters?: {
    properties?: Iterable<[string, string]>;
    events?: Iterable<[string, Array<IPlainAction>]>;
    styles?: Iterable<[string, string]>;
  };
}

interface IPlainApplication {
  id: string;
  name: string;
  description: string;
  pages: Array<{
    id: string;
    name: string;
    root: IPlainControl;
  }>
}

class JSONActionCompiler implements ICompiler<IAction, IPlainAction> {
  compile(action: IAction) {
    var properties = [];
    action.properties.forEach((propertyValue, propertyKey) => {
      properties.push([propertyKey, propertyValue]);
    });

    return {
      type: action.type,
      properties: properties
    };
  }

  decompile(compiledAction: IPlainAction) {
    return ActionService.createByType(
      compiledAction.type, new Map(compiledAction.properties)
    );
  }
}

class JSONControlCompiler implements IControlCompiler<IPlainControl> {
  private _actionCompiler: JSONActionCompiler = new JSONActionCompiler();

  compile(control: Control) {
    var parameters = {
      properties: [],
      styles: [],
      events: []
    };

    control.meta.supportedProperties.forEach((property, propertyKey) => {
      parameters.properties.push([propertyKey, control[propertyKey].getValue()]);
    });

    control.meta.supportedEvents.forEach((eventProperty, eventKey) => {
      parameters.events.push([
        eventKey,
        control.events.get(eventKey).getValue().map(
          (action: IAction) => this._actionCompiler.compile(action)
        )
      ]);
    });

    if (VisualControl.isVisualControl(control)) {
      let visualControl = <VisualControl>control;

      (<VisualControlMetadata>visualControl.meta).supportedStyles.forEach(
        (style, styleKey) => {
          parameters.styles.push(
            [styleKey, visualControl.styles.get(styleKey).getValue()]
          );
        }
      );
    }

    return {
      id: control.id,
      type: control.meta.type,
      children: control.getChildren().map((child) => this.compile(child)),
      parameters: parameters
    };
  }

  decompile(compiledControl: IPlainControl) {
    var parameters = {
      properties: null,
      styles: null,
      events: null
    };

    var controlParameters = compiledControl.parameters;
    if (controlParameters) {
      if (controlParameters.properties) {
        parameters.properties = new Map(controlParameters.properties);
      }

      if (controlParameters.styles) {
        parameters.styles = new Map(controlParameters.styles);
      }

      if (controlParameters.events) {
        parameters.events = new Map();
        var compiledEvents = new Map(controlParameters.events);

        compiledEvents.forEach((compiledActions, eventKey) => {
          parameters.events.set(
            eventKey,
            compiledActions.map(
              (compiledAction) => this._actionCompiler.decompile(compiledAction)
            )
          )
        })

      }
    }

    var control = ControlService.createByType<Control>(
      compiledControl.type, parameters, compiledControl.id
    );

    if (compiledControl.children && compiledControl.children.length) {
      compiledControl.children.forEach(
        (child) => control.addChild(this.decompile(child))
      );
    }

    return control;
  }
}

export class JSONApplicationCompiler implements IApplicationCompiler<string> {
  private _controlCompiler: JSONControlCompiler = new JSONControlCompiler();

  compile(application: Application) {
    var plainApplicationObject = {
      id: application.id,
      name: application.name,
      description: application.description,
      pages: application.pages.map((page) => {
        return {
          id: page.id,
          name: page.name,
          root: this._controlCompiler.compile(page.root)
        };
      })
    };

    return JSON.stringify(plainApplicationObject);
  }

  decompile(compiledApplication: string) {
    var plainApplicationObject = <IPlainApplication>JSON.parse(
      compiledApplication
    );

    return new Application(
      plainApplicationObject.id,
      plainApplicationObject.name,
      plainApplicationObject.description,
      plainApplicationObject.pages.map((plainApplicationPage) => {
        return new ApplicationPage(
          plainApplicationPage.id,
          plainApplicationPage.name,
          this._controlCompiler.decompile(plainApplicationPage.root)
        );
      })
    );
  }
}