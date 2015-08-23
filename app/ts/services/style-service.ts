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
    'align-items',
    new PropertyWithOptions('Align items', [
      new Property('Start', 'flex-start'),
      new Property('End', 'flex-end'),
      new Property('Center', 'center'),
      new Property('Baseline', 'baseline'),
      new Property('Stretch', 'stretch'),
      new Property('Inherit', 'inherit')
    ], 'stretch',  'align-items')
  ],
  [
    'background-color',
    new Property('Background color', 'inherit', 'background-color')
  ],
  ['border', new Property('Border', 'none', 'border')],
  ['color', new Property('Text color', 'inherit', 'color')],
  [
    'display',
    new PropertyWithOptions('Display', [
      new Property('None', 'none'),
      new Property('Inline', 'inline'),
      new Property('Block', 'block'),
      new Property('Inline-Block', 'inline-block'),
      new Property('Flex', 'flex'),
      new Property('Inherit', 'inherit'),
      new Property('Unset', 'unset')
    ], 'inline', 'display')
  ],
  [
    'flex-direction',
    new PropertyWithOptions('Flex direction', [
      new Property('Row', 'row'),
      new Property('Row Reverse', 'row-reverse'),
      new Property('Column', 'column'),
      new Property('Column Reverse', 'column-reverse'),
      new Property('Inherit', 'inherit'),
      new Property('Initial', 'initial'),
      new Property('Unset', 'unset')
    ], 'row',  'flex-direction')
  ],
  [
    'justify-content',
    new PropertyWithOptions('Justify content', [
      new Property('Start', 'flex-start'),
      new Property('End', 'flex-end'),
      new Property('Center', 'center'),
      new Property('Space between', 'space-between'),
      new Property('Space around', 'space-around'),
      new Property('Inherit', 'inherit'),
      new Property('Initial', 'initial'),
      new Property('Unset', 'unset')
    ], 'flex-start',  'justify-content')
  ],
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