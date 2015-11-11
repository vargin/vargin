import { IProperty, Property } from '../../property';
import { IAction } from '../../actions/action';
import { Control } from '../control';
import { ControlMetadata } from '../control-metadata';
import { ControlState } from '../control-state';

const SUPPORTED_PROPERTIES = new Map<string, IProperty<string>>(
  <[string, IProperty<string>][]>[
    ['name', new Property('Name', '[DataSource]')],
    ['schema', new Property('Schema', null, 'schema')],
    ['items', new Property('Items', null, 'items')]
  ]
);

const SUPPORTED_EVENTS = new Map<string, IProperty<Array<IAction>>>(
  <[string, IProperty<Array<IAction>>][]>[
    ['item-added', new Property<IAction[]>('Item added', null, 'item-added')]
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
  constructor(id: string, states?: ControlState[]) {
    super(id, DatasourceControl.getMeta(), states);
  }

  static getMeta() {
    return METADATA;
  }
}
