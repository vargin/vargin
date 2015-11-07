/// <reference path="../../typings/tsd.d.ts" />

import { IProperty, IPropertyWithOptions } from 'core/property';

export class OwnedProperty<T, TOwner> implements IProperty<T> {
  protected _property: IProperty<T>;
  private _owner: TOwner;
  private _key: string;
  private _values: Map<string, T>;

  constructor(
    owner: TOwner,
    property: IProperty<T>,
    key: string,
    values: Map<string, T>
  ) {
    this._owner = owner;
    this._property = property;
    this._key = key;
    this._values = values;
  }

  get owner() {
    return this._owner;
  }

  getName() {
    return this._property.getName();
  }

  getType() {
    return this._property.getType();
  }

  getValue() {
    return this._values.has(this._key) ?
      this._values.get(this._key) :
      this._property.getValue();
  }

  setValue(value: T) {
    if (value !== this._property.getValue()) {
      this._values.set(this._key, value);
    } else if (this._values.has(this._key)) {
      this._values.delete(this._key);
    }
  }

  isEditorVisible() {
    return this._property.isEditorVisible();
  }
}

export class OwnedPropertyWithOptions<T, TOwner> extends OwnedProperty<T, TOwner> implements IPropertyWithOptions<T> {
  constructor(
    owner: TOwner, property: IProperty<T>, key: string, values: Map<string, T>
  ) {
    super(owner, property, key, values);
  }

  getOptions() {
    return (<IPropertyWithOptions<T>>this._property).getOptions();
  }
}
