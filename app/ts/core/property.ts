export interface IProperty<T> {
  getName(): string;
  getType(): string;
  getValue(): T;
  setValue(value: T): void;
  isEditorVisible(): boolean;
}

export interface IPropertyWithOptions<T> extends IProperty<T> {
  getOptions(): Array<IProperty<T>>;
}

export class Property<T> implements IProperty<T>  {
  private _name: string;
  private _type: string;
  private _value: T;
  private _isEditorVisible: boolean;

  constructor(
    name: string,
    value?: T,
    type?: string,
    isEditorVisible?: boolean
  ) {
    this._name = name;
    this._type = type;
    this._value = value !== undefined ? value : null;
    this._isEditorVisible = typeof isEditorVisible !== 'undefined' ?
      isEditorVisible : true;
  }

  getName() {
    return this._name;
  }

  getType() {
    return this._type || typeof this._value;
  }

  getValue() {
    return this._value;
  }

  setValue(value) {
    this._value = value;
  }

  isEditorVisible() {
    return this._isEditorVisible;
  }
}

export class PropertyWithOptions<T>
       extends Property<T>
       implements IPropertyWithOptions<T> {
  private _options: Array<IProperty<T>>;

  constructor(
    name: string,
    options: Array<IProperty<T>>,
    value?: T,
    type?: string,
    isEditorVisible?: boolean
  ) {
    super(
      name,
      value !== undefined ? value : options[0].getValue(),
      type,
      isEditorVisible
    );

    this._options = options;
  }

  getOptions() {
    return this._options;
  }
}