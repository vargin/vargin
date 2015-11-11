import { Control } from '../../core/controls/control';
import { ControlState } from '../../core/controls/control-state';

import { ControlService } from '../../editor/ts/services/control-service';

import { IControlCompiler } from '../control-compiler';
import { IProperty } from '../../core/property';
import { IAction } from '../../core/actions/action';
import { IJSONAction, JSONActionCompiler } from './json-action-compiler';

export interface IJSONControlState {
  name: string;
  isEnabled: boolean;
  overrides: {
    properties?: [string, string][];
    styles?: [string, string][];
    events?: [string, IJSONAction[]][];
  };
}

export interface IJSONControl {
  type: string;
  id?: string;
  children?: IJSONControl[];
  states?: IJSONControlState[];
}

const actionCompiler = new JSONActionCompiler();

export class JSONControlCompiler implements IControlCompiler<IJSONControl> {
  compile(control: Control): Promise<IJSONControl> {
    return JSONControlCompiler.compileStates(control).then<IJSONControl>(
      (states) => {
        return Promise.all(
          control.getChildren().map((child: Control) => this.compile(child))
        ).then((compiledChildren) => {
          return <IJSONControl>{
            id: control.id,
            type: control.meta.type,
            children: compiledChildren,
            states: states
          };
        });
      }
    );
  }

  decompile(compiledControl: IJSONControl) {
    return JSONControlCompiler.decompileStates(compiledControl).then(
      (states) => {
        return ControlService.createByType(
          compiledControl.type, states, compiledControl.id
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
    let statesWithOverrides = control.states.filter(
      (state) => state.hasOverrides()
    );

    let jsonStates = statesWithOverrides.map((state) => {
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
    });

    let actionCompilePromises = [];

    statesWithOverrides.forEach((state, index) => {
      if (state.overrides.events.size > 0) {
        jsonStates[index].overrides.events = [];

        state.overrides.events.forEach((value, key) => {
          actionCompilePromises.push(
            Promise.all(
              value.map((action) => actionCompiler.compile(action))
            ).then(
              (compiledActions) => jsonStates[index].overrides.events.push(
                [key, compiledActions]
              )
            )
          );
        });
      }
    });

    return Promise.all(actionCompilePromises).then(() => jsonStates);
  }

  private static decompileStates(control: IJSONControl): Promise<ControlState[]> {
    let jsonStates = control.states || [];

    let decompiledStates = jsonStates.map(
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

    let actionDecompilePromises = [];

    decompiledStates.forEach((state: ControlState, index) => {
      let jsonState = jsonStates[index];

      if (jsonState.overrides.events) {
        jsonState.overrides.events.forEach(([eventKey, actions]) => {
          actionDecompilePromises.push(
            Promise.all(
              actions.map((action) => actionCompiler.decompile(action))
            ).then((decompiledActions: IAction[]) => {
              state.overrides.events.set(eventKey, decompiledActions);
            })
          );
        });
      }
    });

    return Promise.all(actionDecompilePromises).then(() => decompiledStates);
  }
}
