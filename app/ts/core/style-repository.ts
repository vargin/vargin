import {
  IProperty,
  IPropertyWithOptions,
  Property,
  PropertyWithOptions
} from 'core/property';

class StyleProperty implements IProperty<string> {
  protected _property: IProperty<string>;
  private _value: string;

  constructor(property: IProperty<string>) {
    this._property = property;
    this._value = property.getValue();
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

  setValue(value) {
    this._value = value;
  }

  isEditorVisible() {
    return this._property.isEditorVisible();
  }
}

class StylePropertyWithOptions
       extends StyleProperty
       implements IPropertyWithOptions<string> {
  getOptions() {
    return (<IPropertyWithOptions<string>>this._property).getOptions();
  }
}

const STYLES = new Map<string, IProperty<string>>([
  [
    'background-color',
    new Property('Background color', 'inherit', 'background-color')
  ],
  ['border', new Property('Border', 'none', 'border')],
  ['color', new Property('Text color', 'inherit', 'color')],
  ['opacity', new Property('Opacity', '1', 'opacity')],
  [
    'text-decoration',
    new PropertyWithOptions('Text decoration', [
      new Property('None', 'none'),
      new Property('Underline', 'underline'),
      new Property('Overline', 'overline'),
      new Property('Line-through', 'line-through')
    ], 'none', 'text-decoration'),
  ]
]);

export class StyleRepository {
  static getProperty(type: string): IProperty<string> {
    var styleDescriptor = STYLES.get(type);

    if (!styleDescriptor) {
      throw new Error('Type is not supported: ' + type);
    }

    return 'getOptions' in styleDescriptor ?
      new StylePropertyWithOptions(styleDescriptor) :
      new StyleProperty(styleDescriptor);
  }
}