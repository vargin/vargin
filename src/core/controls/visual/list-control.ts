import { Control } from '../control';
import { ControlMetadata } from '../control-metadata';
import { ContainerControl } from './container-control';
import { OwnedProperty, OwnedPropertyWithOptions } from '../../owned-property';
import { IProperty, Property } from '../../property';
import { IAction } from '../../actions/action';
import { StyleService } from '../../services/style-service';
import { EventService } from '../../services/event-service';
import { ControlState } from '../../controls/control-state';

const PREDEFINED_STATE = new ControlState('predefined', {
  styles: new Map<string, string>(<[string, string][]>[
    ['display', 'flex'],
    ['flex-direction', 'column'],
    ['justify-content', 'space-between'],
    ['min-height', '5rem'],
    ['min-width', '5rem'],
    ['padding', '1rem']
  ])
});

const LIST_ITEM_METADATA = Object.freeze(new ControlMetadata(
  'list-item',
  'List Item',
  'List item',
  ContainerControl.getMeta().events,
  null,
  ContainerControl.getMeta().styles
));

export class ListItemControl extends Control {
  constructor(id: string, states?: ControlState[]) {
    super(id, LIST_ITEM_METADATA, states);
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
    ['display', new OwnedPropertyWithOptions(
      null,
      StyleService.getDescriptor('display'),
      'display',
      PREDEFINED_STATE.overrides.styles
    )],
    ['flex-basis', StyleService.getDescriptor('flex-basis')],
    ['flex-direction', new OwnedPropertyWithOptions(
      null,
      StyleService.getDescriptor('flex-direction'),
      'flex-direction',
      PREDEFINED_STATE.overrides.styles
    )],
    ['flex-grow', StyleService.getDescriptor('flex-grow')],
    ['flex-shrink', StyleService.getDescriptor('flex-shrink')],
    ['font-size', StyleService.getDescriptor('font-size')],
    ['font-weight', StyleService.getDescriptor('font-weight')],
    ['justify-content', new OwnedPropertyWithOptions(
      null,
      StyleService.getDescriptor('justify-content'),
      'justify-content',
      PREDEFINED_STATE.overrides.styles
    )],
    [
      'min-height',
      new OwnedProperty(
        null,
        StyleService.getDescriptor('min-height'),
        'min-height',
        PREDEFINED_STATE.overrides.styles
      )
    ],
    [
      'min-width',
      new OwnedProperty(
        null,
        StyleService.getDescriptor('min-width'),
        'min-width',
        PREDEFINED_STATE.overrides.styles
      )
    ],
    [
      'padding',
      new OwnedProperty(
        null,
        StyleService.getDescriptor('padding'),
        'padding',
        PREDEFINED_STATE.overrides.styles
      )
    ]
  ]
);

const SUPPORTED_EVENTS = new Map<string, IProperty<Array<IAction>>>(
  <[string, IProperty<Array<IAction>>][]>[
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
  constructor(id: string, states?: ControlState[]) {
    super(id, ListControl.getMeta(), states);
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
