/// <reference path="../../../../../typings/tsd.d.ts" />
import { IProperty, Property } from 'core/property';
import { IAction } from 'core/actions/action';
import { Control } from 'core/controls/control';
import { ControlMetadata } from 'core/controls/control-metadata';

const SUPPORTED_PROPERTIES = new Map<string, IProperty<string>>([
  ['name', new Property('Name', '[DataSource]')],
  ['schema', new Property('Schema', null, 'schema')]
]);

const SUPPORTED_EVENTS = new Map<string, IProperty<Array<IAction>>>([
  ['item-added', new Property<IAction[]>('Item added', null, 'item-added')]
]);

const METADATA = Object.freeze(
  new ControlMetadata(
    'datasource',
    'Data Source',
    'Custom Data Source',
    SUPPORTED_EVENTS,
    SUPPORTED_PROPERTIES
  )
);

export class DataSourceControl extends Control {
  constructor(id: string) {
    super(id, DataSourceControl.getMeta());
  }

  get name() {
    return this._properties.get('name');
  }

  get schema() {
    return this._properties.get('schema');
  }

  static getMeta() {
    return METADATA;
  }
}
