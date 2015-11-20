import { Control } from '../../core/controls/control';
import { ControlService } from '../../core/services/control-service';
import { IControlCompiler } from '../control-compiler';

import * as JSONOverrides from './json-overrides-compiler';

export interface IJSONControl {
  type: string;
  id?: string;
  children?: IJSONControl[];
  overrides?: JSONOverrides.IJSONOverrides;
}

export class JSONControlCompiler implements IControlCompiler<IJSONControl> {
  private overridesCompiler = new JSONOverrides.JSONOverridesCompiler();

  compile(control: Control): Promise<IJSONControl> {
    let overridesPromise = control.overrides ?
      this.overridesCompiler.compile(control.overrides) :
      Promise.resolve(null);

    return overridesPromise.then<IJSONControl>((overrides) => {
      return Promise.all(
        control.getChildren().map((child: Control) => this.compile(child))
      ).then((compiledChildren) => {
        return <IJSONControl>{
          id: control.id,
          type: control.meta.type,
          children: compiledChildren,
          overrides: overrides
        };
      });
    });
  }

  decompile(compiledControl: IJSONControl) {
    let overridesPromise = compiledControl.overrides ?
      this.overridesCompiler.decompile(compiledControl.overrides) :
      Promise.resolve(null);

    return overridesPromise.then((overrides) => {
      let control = ControlService.createByType(
        compiledControl.type, overrides, compiledControl.id
      );

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
}
