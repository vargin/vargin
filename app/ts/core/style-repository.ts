import {
  ControlProperty,
  PredefinedControlProperty
} from 'core/controls/control-property';

export class StyleProperty {
  private _property: ControlProperty<string>;
  private _type: string;

  public value: string;

  constructor(type: string, property: ControlProperty<string>) {
    this._type = type;
    this._property = property;

    this.value = property.value;
  }

  get name() {
    return this._property.name;
  }

  get type() {
    return this._type;
  }

  toString() {
    return this.value;
  }
}

const STYLES = new Map<string, ControlProperty<string>>([
  ['background-color', new ControlProperty('Background color', 'inherit')],
  ['border', new ControlProperty('Border', 'none')],
  ['color', new ControlProperty('Text color', 'inherit')],
  [
    'text-decoration',
    new PredefinedControlProperty('Text decoration', [
      new ControlProperty('None', 'none'),
      new ControlProperty('Underline', 'underline'),
      new ControlProperty('Overline', 'overline'),
      new ControlProperty('Line-through', 'line-through')
    ])
  ]
]);

export class StyleRepository {
  static getProperty(type: string) {
    var styleDescriptor = STYLES.get(type);

    if (!styleDescriptor) {
      throw new Error('Type is not supported: ' + type);
    }

    return new StyleProperty(type, styleDescriptor);
  }
}