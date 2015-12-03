import { Control } from '../control';
import { ControlMetadata } from '../control-metadata';
import { ContainerControl } from './container-control';
import { IProperty, Property } from '../../property';
import { StyleService } from '../../services/style-service';
import { EventService } from '../../services/event-service';
import { IOverrides, Overrides } from '../../overrides/overrides';
import { Trigger } from '../../triggers/trigger';

const LIST_ITEM_PREDEFINED_OVERRIDES = new Map(
  <[string, Map<string, string>][]>[
    ['styles', new Map(<[string, string][]>[
      ['display', 'block'],
      ['min-height', '5rem'],
      ['min-width', '5rem']
    ])]
  ]
);


const PREDEFINED_OVERRIDES = new Map(<[string, Map<string, string>][]>[
  ['styles', new Map(<[string, string][]>[
    ['display', 'flex'],
    ['flex-direction', 'column'],
    ['justify-content', 'space-between'],
    ['min-height', '5rem'],
    ['min-width', '5rem'],
    ['padding', '1rem']
  ])]
]);

const LIST_ITEM_METADATA = Object.freeze(new ControlMetadata(
  'list-item',
  'List Item',
  'List item',
  ContainerControl.getMeta().events,
  null,
  ContainerControl.getMeta().styles
));

export class ListItemControl extends Control {
  constructor(id: string, overrides?: IOverrides) {
    this.predefinedOverrides = new Overrides(
      '__predefined__', LIST_ITEM_PREDEFINED_OVERRIDES, true, false
    );

    super(id, LIST_ITEM_METADATA, overrides);
  }

  static getMeta() {
    return LIST_ITEM_METADATA;
  }
}

const SUPPORTED_PROPERTIES = new Map<string, IProperty<string>>(
  <[string, IProperty<string>][]>[
    ['datasource', new Property<string>('Datasource', '', 'datasource')]
  ]
);

const SUPPORTED_STYLES =  new Map<string, IProperty<string>>(
  <[string, IProperty<string>][]>[
    ['align-items', StyleService.getDescriptor('align-items')],
    ['background-color', StyleService.getDescriptor('background-color')],
    ['border', StyleService.getDescriptor('border')],
    ['color', StyleService.getDescriptor('color')],
    ['display', StyleService.getDescriptor('display')],
    ['flex-basis', StyleService.getDescriptor('flex-basis')],
    ['flex-direction', StyleService.getDescriptor('flex-direction')],
    ['flex-grow', StyleService.getDescriptor('flex-grow')],
    ['flex-shrink', StyleService.getDescriptor('flex-shrink')],
    ['font-size', StyleService.getDescriptor('font-size')],
    ['font-weight', StyleService.getDescriptor('font-weight')],
    ['justify-content', StyleService.getDescriptor('justify-content')],
    ['min-height', StyleService.getDescriptor('min-height')],
    ['min-width', StyleService.getDescriptor('min-width')],
    ['padding', StyleService.getDescriptor('padding')]
  ]
);

const SUPPORTED_EVENTS = new Map<string, IProperty<string>>(
  <[string, IProperty<string>][]>[
    ['click', EventService.getDescriptor('click')],
    ['hover', EventService.getDescriptor('hover')]
  ]
);

const METADATA = Object.freeze(new ControlMetadata(
  'list',
  'List',
  'List of the items',
  SUPPORTED_EVENTS,
  SUPPORTED_PROPERTIES,
  SUPPORTED_STYLES
));

export class ListControl extends Control {
  constructor(id: string, overrides?: IOverrides, triggers?: Trigger[]) {
    this.predefinedOverrides = new Overrides(
      '__predefined__', PREDEFINED_OVERRIDES, true, false
    );

    super(id, ListControl.getMeta(), overrides, triggers);
  }

  getTemplate(): ListItemControl {
    let children = this.getChildren();
    return children.length ? <ListItemControl>children[0] : null;
  }

  setTemplate(template: ListItemControl) {
    let children = this.getChildren();
    if (children.length) {
      this.removeChild(children[0]);
    }

    if (template) {
      this.addChild(template);
    }
  }

  static getMeta() {
    return METADATA;
  }
}
