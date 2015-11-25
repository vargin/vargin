import { IOverrides, Overrides } from '../../core/overrides/overrides';
import { ICompiler } from '../compiler';

export interface IJSONOverridesNode {
  id: string;
  name: string;
  groups: [string, [string, string][]][];

  isEnabled: boolean;
  isEditorVisible: boolean;

  children?: IJSONOverridesNode[];
}

export interface IJSONOverrides {
  current?: string;
  root: IJSONOverridesNode;
}

export class JSONOverridesCompiler implements ICompiler<IOverrides, IJSONOverrides> {
  compile(overrides: IOverrides): Promise<IJSONOverrides> {
    return Promise.resolve<IJSONOverrides>({
      current: overrides.id,
      root: this.compileOverrides(overrides.getRoot())
    });
  }

  decompile(compiledOverrides: IJSONOverrides): Promise<IOverrides> {
    let decompiledOverridesRoot = this.decompileOverrides(
      compiledOverrides.root
    );

    // If we have non-default current and it differs from the root one, let's
    // find and replace.
    if (compiledOverrides.current ||
        compiledOverrides.current !== decompiledOverridesRoot.id) {
      decompiledOverridesRoot = decompiledOverridesRoot.find(
        compiledOverrides.current
      ) || decompiledOverridesRoot;
    }

    return Promise.resolve(decompiledOverridesRoot);
  }

  private compileOverrides(overrides: IOverrides): IJSONOverridesNode {
    let jsonOverrides = <IJSONOverridesNode>{
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

  private decompileOverrides(jsonOverrides: IJSONOverridesNode): IOverrides {
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
