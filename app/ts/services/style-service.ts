import {
  IProperty,
  IPropertyWithOptions,
  Property,
  PropertyWithOptions
} from 'core/property';

import {
  ControlProperty,
  ControlPropertyWithOptions
} from 'core/controls/control-property';

const STYLES = new Map<string, IProperty<string>>([
  [
    'background-color',
    new Property('Background color', 'inherit', 'background-color')
  ],
  ['border', new Property('Border', 'none', 'border')],
  ['color', new Property('Text color', 'inherit', 'color')],
  ['min-height', new Property('Min height', '0')],
  ['min-width', new Property('Min width', '0')],
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

export class StyleService {
  static getDescriptor(type: string): IProperty<string> {
    if (!STYLES.has(type)) {
      throw new Error('Type is not supported: ' + type);
    }

    return STYLES.get(type);
  }
}