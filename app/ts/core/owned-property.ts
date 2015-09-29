import { IProperty, IPropertyWithOptions } from 'core/property';

export class OwnedProperty<T, TOwner> implements IProperty<T> {
  public _owner: TOwner;
  protected _property: IProperty<T>;
  private _value: T;

  constructor(owner: TOwner, property: IProperty<T>, value?: T) {
    this._owner = owner;
    this._property = property;
    this._value = value !== undefined ? value : property.getValue();
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
    return this._value;
  }

  setValue(value: T) {
    this._value = value;
  }

  isEditorVisible() {
    return this._property.isEditorVisible();
  }
}

export class OwnedPropertyWithOptions<T, TOwner> extends OwnedProperty<T, TOwner> implements IPropertyWithOptions<T> {
  constructor(owner: TOwner, property: IProperty<T>, value?: T) {
    super(owner, property, value);
  }

  getOptions() {
    return (<IPropertyWithOptions<T>>this._property).getOptions();
  }
}
