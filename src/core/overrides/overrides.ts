export interface IOverride<TValue> {
  get(): TValue;
  set(value: TValue);
}

export interface IOverrides {
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
  find(name: string): IOverrides;

  merge(overrides: IOverrides);

  clone(): IOverrides;
}

export class Overrides implements IOverrides {
  parent: IOverrides = null;
  children: IOverrides[] = [];

  constructor(
    public name: string,
    public groups: Map<string, Map<string, any>> =
      new Map<string, Map<string, any>>(),
    public isEnabled: boolean = true,
    public isEditorVisible: boolean = true
  ) {
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

  find(name: string) {
    for (let child of this.children) {
      if (child.name === name) {
        return child;
      }

      let foundChild = child.find(name);
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

  clone(): Overrides {
    let clonedGroups = new Map<string, Map<string, any>>();
    this.groups.forEach((group, key) => {
      let clonedItems = new Map<string, any>();
      group.forEach((items, itemsKey) => {
        clonedItems.set(itemsKey, items);
      });
      clonedGroups.set(key, clonedItems);
    });

    let clonedOverrides = new Overrides(
      this.name, clonedGroups, this.isEnabled, this.isEditorVisible
    );

    this.children.forEach((child) => {
      clonedOverrides.add(child.clone());
    });

    return clonedOverrides;
  }
}
