import { Control } from '../../core/controls/control';
import { ControlService } from '../../core/services/control-service';
import { IControlCompiler } from '../control-compiler';

import * as JSONOverrides from './json-overrides-compiler';
import * as JSONTrigger from './json-triggers-compiler';

export interface IJSONControl {
  type: string;
  id?: string;
  children?: IJSONControl[];
  overrides?: JSONOverrides.IJSONOverrides;
  triggers?: JSONTrigger.IJSONTrigger[];
}

export class JSONControlCompiler implements IControlCompiler<IJSONControl> {
  private overridesCompiler = new JSONOverrides.JSONOverridesCompiler();
  private triggerCompiler = new JSONTrigger.JSONTriggerCompiler();

  compile(control: Control): Promise<IJSONControl> {
    let overridesPromise = control.overrides ?
      this.overridesCompiler.compile(control.overrides) :
      Promise.resolve(null);

    let triggersPromise;
    if (control.triggers.length) {
      triggersPromise = Promise.all(control.triggers.map((trigger) => {
        return this.triggerCompiler.compile(trigger);
      }));
    } else {
      triggersPromise = Promise.resolve(null);
    }

    let childrenPromise = Promise.all(control.getChildren().map(
      (child: Control) => this.compile(child)
    ));

    return Promise.all(
      [overridesPromise, triggersPromise, childrenPromise]
    ).then(
      ([overrides, triggers, children]) => {
        return <IJSONControl>{
          id: control.id,
          type: control.meta.type,
          children: children,
          overrides: overrides,
          triggers: triggers
        };
      }
    );
  }

  decompile(compiledControl: IJSONControl) {
    let overridesPromise = compiledControl.overrides ?
      this.overridesCompiler.decompile(compiledControl.overrides) :
      Promise.resolve(null);

    let triggersPromise;
    if (compiledControl.triggers) {
      triggersPromise = Promise.all(compiledControl.triggers.map((trigger) => {
        return this.triggerCompiler.decompile(trigger);
      }));
    } else {
      triggersPromise = Promise.resolve([]);
    }

    return Promise.all([overridesPromise, triggersPromise]).then(
      ([overrides, triggers]) => {
        let control = ControlService.createByType(
          compiledControl.type, overrides, triggers, compiledControl.id
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
      }
    );
  }
}
