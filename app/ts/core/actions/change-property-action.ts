import { Action } from 'core/actions/action';
import { IProperty } from 'core/property';

export class ChangePropertyAction<TPropertyValue> extends Action {
  private _property: IProperty<TPropertyValue>;
  private _value: TPropertyValue;

  constructor(property: IProperty<TPropertyValue>, value: TPropertyValue) {
    super('Change Property', 'change-property-action');

    this._property = property;
    this._value = value;
  }

  get property() {
    return this._property;
  }

  get value() {
    return this._value;
  }

  perform() {
    try {
      this._property.setValue(this._value);
      return Promise.resolve(true);
    } catch(e) {
      return Promise.reject<boolean>(e);
    }
  }
}
