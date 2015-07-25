export interface IPropertyDescriptor {
  getName(): string;
  getType(): string;
  isEditorVisible(): boolean;
}

export interface IProperty<T> extends IPropertyDescriptor {
  getValue(): T;
  setValue(value: T): void;
}

export interface IPropertyWithOptions<T> extends IProperty<T> {
  getOptions(): Array<IProperty<T>>;
}

export class PropertyDescriptor implements IPropertyDescriptor {
  private _name: string;
  private _type: string;
  private _isEditorVisible: boolean;

  constructor(name: string, type: string, isEditorVisible?: boolean) {
    this._name = name;
    this._type = type;
    this._isEditorVisible = typeof isEditorVisible !== 'undefined' ?
      isEditorVisible : true;
  }

  getName() {
    return this._name;
  }

  getType() {
    return this._type;
  }

  isEditorVisible() {
    return this._isEditorVisible;
  }
}

export class Property<T> extends PropertyDescriptor implements IProperty<T>  {
  private _value: T;

  constructor(
    name: string,
    value?: T,
    type?: string,
    isEditorVisible?: boolean
  ) {
    super(name, type, isEditorVisible);
    this._value = value !== undefined ? value : null;
  }

  getType() {
    return super.getType() || typeof this._value;
  }

  getValue() {
    return this._value;
  }

  setValue(value) {
    this._value = value;
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