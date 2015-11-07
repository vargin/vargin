import { Control, IControlParameters } from 'core/controls/control';
import { ControlState } from 'core/controls/control-state';

import { ControlService } from 'editor/ts/services/control-service';

import { IControlCompiler } from 'compilers/control-compiler';
import { IProperty } from 'core/property';
import { IAction } from 'core/actions/action';
import {
  IJSONAction,
  JSONActionCompiler
} from 'compilers/json/json-action-compiler';

export interface IJSONControlState {
  name: string;
  isEnabled: boolean;
  overrides: {
    properties?: [string, string][];
    styles?: [string, string][];
  };
}

export interface IJSONControl {
  type: string;
  id?: string;
  children?: IJSONControl[];
  states?: IJSONControlState[];
  parameters?: {
    events?: [string, IJSONAction[]][];
  };
}

const actionCompiler = new JSONActionCompiler();

export class JSONControlCompiler implements IControlCompiler<IJSONControl> {
  compile(control: Control): Promise<IJSONControl> {
    return Promise.all<any>([
      JSONControlCompiler.compileStates(control),
      JSONControlCompiler.compileEvents(control)
    ]).then<IJSONControl>(([states, events]) => {
      return Promise.all(
        control.getChildren().map((child: Control) => this.compile(child))
      ).then((compiledChildren) => {
        return <IJSONControl>{
          id: control.id,
          type: control.meta.type,
          children: compiledChildren,
          states: states,
          parameters: { events }
        };
      });
    });
  }

  decompile(compiledControl: IJSONControl) {
    return Promise.all<any>([
      JSONControlCompiler.decompileStates(compiledControl),
      JSONControlCompiler.decompileEvents(compiledControl)
    ]).then(([states, events]) => {
      return ControlService.createByType(
        compiledControl.type,
        states,
        <IControlParameters>{ events: <Map<string, IAction[]>>events },
        compiledControl.id
      );
    }).then((control: Control) => {
      if (compiledControl.children && compiledControl.children.length) {
        return Promise.all<Control>(
          compiledControl.children.map((child) => this.decompile(child))
        ).then((children) => {
          children.forEach((child) => control.addChild(child));

          return control;
        });
      }

      return Promise.resolve(control);
    });
  }

  private static compileStates(control: Control): Promise<IJSONControlState[]> {
    let states = control.states.filter((state) => state.hasOverrides()).map(
      (state) => {
        let jsonState = <IJSONControlState>{
          name: state.name,
          isEnabled: state.isEnabled,
          overrides: {}
        };

        ['properties', 'styles'].forEach((overrideKey) => {
          let overrides = state.overrides[overrideKey];
          if (overrides.size > 0) {
            jsonState.overrides[overrideKey] = [];
            overrides.forEach((value, key) => {
              jsonState.overrides[overrideKey].push([key, value]);
            });
          }
        });

        return jsonState;
      }
    );

    return Promise.resolve(states);
  }

  private static decompileStates(control: IJSONControl): Promise<ControlState[]> {
    let decompiledStates = (control.states || []).map(
      (jsonState: IJSONControlState) => {
        return new ControlState(
          jsonState.name,
          {
            properties: new Map<string, string>(
              jsonState.overrides.properties || []
            ),
            styles: new Map<string, string>(jsonState.overrides.styles || [])
          },
          typeof jsonState.isEnabled === 'boolean'
            ? jsonState.isEnabled : true
        );
      }
    );

    return Promise.resolve(decompiledStates);
  }

  private static compileEvents(control: Control): Promise<[string, IJSONAction[]][]> {
    let actionCompilePromises = [];
    let events = [];

    control.meta.supportedEvents.forEach((eventProperty, eventKey) => {
      actionCompilePromises.push(
        Promise.all(
          control.events.get(eventKey).getValue().map(
            (action) => actionCompiler.compile(action)
          )
        ).then(
          (compiledActions) => events.push([eventKey, compiledActions])
        )
      );
    });

    return Promise.all(actionCompilePromises).then(() => events);
  }

  private static decompileEvents(control: IJSONControl): Promise<Map<string, IAction[]>> {
    let hasEvents = control.parameters && control.parameters.events;

    if (!hasEvents) {
      return Promise.resolve(null);
    }

    let actionDecompilePromises = [];
    let events = new Map<string, IAction[]>();

    control.parameters.events.forEach(([eventKey, actions]) => {
      actionDecompilePromises.push(
        Promise.all(
          actions.map((action) => actionCompiler.decompile(action))
        ).then((decompiledActions: IAction[]) => {
          events.set(eventKey, decompiledActions);
        })
      );
    });

    return Promise.all(actionDecompilePromises).then(() => events);
  }
}
