/// <reference path="../../../typings/tsd.d.ts" />

import { IProperty, IPropertyWithOptions } from 'core/property';
import { IOverride } from 'core/overrides/overrides';

export class OverrideProperty<TValue, TOwner> implements IProperty<TValue> {
  protected _property: IProperty<TValue>;
  private _owner: TOwner;
  private _override: IOverride<TValue>;

  constructor(
    property: IProperty<TValue>, owner: TOwner, override: IOverride<TValue>
  ) {
    this._owner = owner;
    this._property = property;
    this._override = override;
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
    let value = this._override.get();
    return value !== undefined ? value : this._property.getValue();
  }

  setValue(value: TValue) {
    this._override.set(value);
  }

  setOverride(override: IOverride<TValue>) {
    this._override = override;
  }

  isEditorVisible() {
    return this._property.isEditorVisible();
  }
}

export class OverridePropertyWithOptions<TValue, TOwner> extends OverrideProperty<TValue, TOwner> implements IPropertyWithOptions<TValue> {
  constructor(
    property: IProperty<TValue>, owner: TOwner, override: IOverride<TValue>
  ) {
    super(property, owner, override);
  }

  getOptions() {
    return (<IPropertyWithOptions<TValue>>this._property).getOptions();
  }
}
