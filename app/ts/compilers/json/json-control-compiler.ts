import { Control } from 'core/controls/control';
import { VisualControl } from 'core/controls/visual/visual-control';
import { VisualControlMetadata } from 'core/controls/visual/visual-control-metadata';

import { ControlService } from 'services/control-service';

import { IControlCompiler } from 'compilers/control-compiler';
import { IProperty } from 'core/property';
import { IAction } from 'core/actions/action';
import {
  IJSONAction,
  JSONActionCompiler
} from 'compilers/json/json-action-compiler';

export interface IJSONControl {
  type: string;
  id?: string;
  children?: IJSONControl[];
  parameters?: {
    properties?: Iterable<[string, string]>;
    events?: Iterable<[string, Array<IJSONAction>]>;
    styles?: Iterable<[string, string]>;
  };
}

export class JSONControlCompiler implements IControlCompiler<IJSONControl> {
  private _actionCompiler: JSONActionCompiler = new JSONActionCompiler();

  compile(control: Control): IJSONControl {
    let parameters = <{
      properties: [string, string][],
      events: [string, IJSONAction[]][],
      styles: [string, string][]
    }>{
      properties: [],
      events: [],
      styles: []
    };

    control.meta.supportedProperties.forEach((property, propertyKey) => {
      parameters.properties.push([
        propertyKey, (<IProperty<string>>control[propertyKey]).getValue()
      ]);
    });

    control.meta.supportedEvents.forEach((eventProperty, eventKey) => {
      let actions = control.events.get(eventKey).getValue();

      if (actions.length) {
        parameters.events.push([
          eventKey,
          actions.map((action) => this._actionCompiler.compile(action))
        ]);
      }
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
      children: control.getChildren().map(
        (child: Control) => this.compile(child)
      ),
      parameters: parameters
    };
  }

  decompile(compiledControl: IJSONControl) {
    let parameters = <{
      properties: Map<string, string>,
      styles: Map<string, string>,
      events: Map<string, IAction[]>
    }>{
      properties: null,
      styles: null,
      events: null
    };

    let controlParameters = compiledControl.parameters;
    if (controlParameters) {
      if (controlParameters.properties) {
        parameters.properties = new Map<string, string>(
          controlParameters.properties
        );
      }

      if (controlParameters.styles) {
        parameters.styles = new Map<string, string>(controlParameters.styles);
      }

      if (controlParameters.events) {
        parameters.events = new Map<string, IAction[]>();
        let compiledEvents = new Map(controlParameters.events);

        compiledEvents.forEach((compiledActions, eventKey) => {
          parameters.events.set(
            eventKey,
            compiledActions.map(
              (compiledAction) => this._actionCompiler.decompile(compiledAction)
            )
          );
        });
      }
    }

    let control = ControlService.createByType(
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
