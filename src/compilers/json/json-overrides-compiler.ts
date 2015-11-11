import { IOverrides, Overrides } from '../../core/overrides/overrides';
import { ICompiler } from '../compiler';

export interface IJSONOverrides {
  id: string;
  name: string;
  groups: [string, [string, string][]][];

  isEnabled: boolean;
  isEditorVisible: boolean;

  children?: IJSONOverrides[];
}

export class JSONOverridesCompiler implements ICompiler<IOverrides, IJSONOverrides> {
  compile(overrides: IOverrides): Promise<IJSONOverrides> {
    return Promise.resolve<IJSONOverrides>(this.compileOverrides(overrides));
  }

  decompile(compiledOverrides: IJSONOverrides): Promise<IOverrides> {
    return Promise.resolve(this.decompileOverrides(compiledOverrides));
  }

  private compileOverrides(overrides: IOverrides): IJSONOverrides {
    let jsonOverrides = <IJSONOverrides>{
      id: overrides.id,
      name: overrides.name,
      isEnabled: overrides.isEnabled,
      isEditorVisible: overrides.isEditorVisible,

      groups: []
    };

    overrides.groups.forEach((group, groupKey) => {
      let jsonGroup: [string, [string, string][]] = [groupKey, []];

      group.forEach((value, valueKey) => {
        jsonGroup[1].push([valueKey, value]);
      });

      jsonOverrides.groups.push(jsonGroup);
    });

    if (overrides.children.length) {
      jsonOverrides.children = [];
      for (let child of overrides.children) {
        jsonOverrides.children.push(this.compileOverrides(child));
      }
    }

    return jsonOverrides;
  }

  private decompileOverrides(jsonOverrides: IJSONOverrides): IOverrides {
    let overrides = new Overrides(
      jsonOverrides.id,
      jsonOverrides.name,
      new Map(
        <[string, Map<string, string>][]>
        jsonOverrides.groups.map((groupKeyValue) => {
          return [groupKeyValue[0], new Map(groupKeyValue[1])];
        })
      ),
      jsonOverrides.isEnabled,
      jsonOverrides.isEditorVisible
    );

    if (jsonOverrides.children) {
      jsonOverrides.children.forEach((child) => {
        overrides.add(this.decompileOverrides(child));
      });
    }

    return overrides;
  }
}
