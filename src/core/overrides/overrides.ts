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
  remove(overrides: IOverrides);
  find(id: string): IOverrides;

  merge(overrides: IOverrides);
}

export class Overrides implements IOverrides {
  parent: IOverrides = null;
  children: IOverrides[] = [];

  constructor(
    public id: string,
    public name: string,
    public groups: Map<string, Map<string, any>> =
      new Map<string, Map<string, any>>(),
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
    let group = this.groups.get(groupKey);
    if (!group) {
      group = new Map<string, TValue>();
      this.groups.set(groupKey, group);
    }

    group.set(valueKey, value);
  }

  add(overrides: IOverrides) {
    overrides.parent = this;
    this.children.push(overrides);
  }

  remove(overrides: IOverrides) {
    let childIndex = this.children.findIndex((child) => child === overrides);

    if (childIndex >= 0) {
      overrides.parent = null;
      this.children.splice(childIndex, 1);
    }
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

  merge(overrides: IOverrides) {
    overrides.groups.forEach((group, groupKey) => {
      this.groups.set(groupKey, group);
    });
  }
}