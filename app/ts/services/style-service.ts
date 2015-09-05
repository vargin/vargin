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
    'align-items', new PropertyWithOptions('Align items', [
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
    new Property('Background color', 'transparent', 'background-color')
  ],
  ['background-image', new Property('Background image', '', 'image')],
  [
    'background-position',
    new PropertyWithOptions('Background position', [
      new Property('Top', 'top'),
      new Property('Left', 'Left'),
      new Property('Right', 'right'),
      new Property('Bottom', 'bottom'),
      new Property('Center', 'center')
    ], 'center')
  ],
  [
    'background-repeat',
    new PropertyWithOptions('Background repeat', [
      new Property('Repeat', 'repeat'),
      new Property('Repeat-X', 'repeat-x'),
      new Property('Repeat-Y', 'repeat-y'),
      new Property('Space', 'space'),
      new Property('Round', 'round'),
      new Property('No-Repeat', 'no-repeat'),
      new Property('Inherit', 'inherit')
    ], 'repeat')
  ],
  [
    'background-size',
    new PropertyWithOptions('Background size', [
      new Property('Auto', 'auto'),
      new Property('Cover', 'cover'),
      new Property('Contain', 'contain'),
      new Property('50% Auto', '50% auto'),
      new Property('Auto 50%', 'auto 50%'),
      new Property('Inherit', 'inherit')
    ], 'auto')
  ],
  ['border', new Property('Border', 'none', 'border')],
  ['border-radius', new Property('Border radius', '0')],
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
  ['height', new Property('Height', 'auto')],
  ['flex-basis', new Property('Flex basis', 'auto')],
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
  ['flex-grow', new Property('Flex grow', '0')],
  ['flex-shrink', new Property('Flex shrink', '1')],
  ['font-size', new Property('Font size', 'inherit')],
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
  ['line-height', new Property('Line height', 'auto')],
  ['min-height', new Property('Min height', '0')],
  ['min-width', new Property('Min width', '0')],
  ['opacity', new Property('Opacity', '1', 'opacity')],
  ['padding', new Property('Padding', '0', 'padding')],
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
