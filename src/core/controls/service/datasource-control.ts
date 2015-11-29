import { IProperty, Property } from '../../property';
import { Trigger } from '../../triggers/trigger';
import { Control } from '../control';
import { ControlMetadata } from '../control-metadata';
import { IOverrides } from '../../overrides/overrides';

const SUPPORTED_PROPERTIES = new Map<string, IProperty<string>>(
  <[string, IProperty<string>][]>[
    ['name', new Property('Name', '[DataSource]')],
    ['schema', new Property('Schema', null, 'schema')],
    ['items', new Property('Items', null, 'items')]
  ]
);

const SUPPORTED_EVENTS = new Map<string, IProperty<string>>(
  <[string, IProperty<string>][]>[
    ['item-added', new Property<string>('Item added', null, 'item-added')]
  ]
);

const METADATA = Object.freeze(
  new ControlMetadata(
    'datasource',
    'Data Source',
    'Custom Data Source',
    SUPPORTED_EVENTS,
    SUPPORTED_PROPERTIES
  )
);

export class DatasourceControl extends Control {
  constructor(id: string, overrides?: IOverrides, triggers?: Trigger[]) {
    super(id, DatasourceControl.getMeta(), overrides, triggers);
  }

  static getMeta() {
    return METADATA;
  }
}
