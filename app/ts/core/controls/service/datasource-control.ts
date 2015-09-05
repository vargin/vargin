/// <reference path="../../../../../typings/tsd.d.ts" />
import { Control } from 'core/controls/control';
import { ControlMetadata } from 'core/controls/control-metadata';

const METADATA = Object.freeze(
  new ControlMetadata('datasource', 'Data Source', 'Custom Data Source')
);

export class DataSourceControl extends Control {
  constructor(id: string) {
    super(id, DataSourceControl.getMeta());
  }

  static getMeta() {
    return METADATA;
  }
}
