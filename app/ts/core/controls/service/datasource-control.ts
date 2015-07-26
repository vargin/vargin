/// <reference path="../../../../../typings/tsd.d.ts" />
import BaseControl from 'core/controls/base-control';
import { ControlMetadata } from 'core/controls/control-metadata';

const METADATA = Object.freeze(
  new ControlMetadata('datasource', 'Data Source', 'Custom Data Source')
);

export default class DataSourceControl extends BaseControl {
  constructor(id) {
    super(id, DataSourceControl.getMeta());
  }

  static getMeta() {
    return METADATA;
  }
}
