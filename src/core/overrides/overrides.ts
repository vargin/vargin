/// <reference path="../../../typings/tsd.d.ts" />

export interface IOverride<TValue> {
  get(): TValue;
  set(value: TValue);
}

export interface IOverrides {
  id: string;
  name: string;
  groups: Map<string, Map<string, any>>;

  isEnabled: boolean;
  isEditorVisible: boolean;

  parent: IOverrides;
  children: IOverrides[];

  getValue<TValue>(overrideKey: string, valueKey: string): TValue;
  setValue<TValue>(overrideKey: string, valueKey: string, value: TValue);

  forKey<TValue>(groupKey: string, key: string): IOverride<TValue>;

  getRoot(): IOverrides;
  add(overrides: IOverrides);
  find(id: string): IOverrides;
}

export class Overrides implements IOverrides {
  groups: Map<string, Map<string, any>>;

  parent: IOverrides = null;
  children: IOverrides[] = [];

  constructor(
    public id: string,
    public name: string,
    groups: Map<string, Map<string, any>> = new Map<string, Map<string, any>>(),
    public isEnabled: boolean = true,
    public isEditorVisible: boolean = true
  ) {
    this.id = id;
    this.name = name;
    this.groups = groups;

    this.isEnabled = isEnabled;
    this.isEditorVisible = isEditorVisible;
  }

  getValue<TValue>(groupKey: string, valueKey: string): TValue {
    let overrideValues = this.groups.get(groupKey);
    if (overrideValues && overrideValues.has(valueKey)) {
      return overrideValues.get(valueKey);
    }

    if (this.parent) {
      return <TValue>this.parent.getValue(groupKey, valueKey);
    }
  }

  setValue<TValue>(groupKey: string, valueKey: string, value: TValue) {
    this.groups.get(groupKey).set(valueKey, value);
  }

  add(overrides: IOverrides) {
    overrides.parent = this;
    this.children.push(overrides);
  }

  find(id: string) {
    for (let child of this.children) {
      if (child.id === id) {
        return child;
      }

      let foundChild = child.find(id);
      if (foundChild) {
        return foundChild;
      }
    }

    return null;
  }

  getRoot() {
    let root = <IOverrides>this;

    while (root.parent) {
      root = root.parent;
    }

    return root;
  }

  forKey<TValue>(groupKey: string, key: string): IOverride<TValue> {
    let overrides = this;

    return {
      get(): TValue {
        return overrides.getValue<TValue>(groupKey, key);
      },

      set(value: TValue){
        overrides.setValue<TValue>(groupKey, key, value);
      }
    };
  }
}
