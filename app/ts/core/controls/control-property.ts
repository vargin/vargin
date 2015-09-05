import { IProperty, IPropertyWithOptions } from 'core/property';

export class ControlProperty<T> implements IProperty<T> {
  protected _property: IProperty<T>;
  private _value: T;

  constructor(property: IProperty<T>, value?: T) {
    this._property = property;
    this._value = value !== undefined ? value : property.getValue();
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

export class ControlPropertyWithOptions<T> extends ControlProperty<T> implements IPropertyWithOptions<T> {
  constructor(property: IProperty<T>, value?: T) {
    super(property, value);
  }

  getOptions() {
    return (<IPropertyWithOptions<T>>this._property).getOptions();
  }
}
