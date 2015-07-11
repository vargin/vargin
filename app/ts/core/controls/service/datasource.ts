/// <reference path="../../../../../typings/tsd.d.ts" />
import BaseControl from 'core/controls/base';

class DataSourceControl extends BaseControl {
  constructor() {
    super('datasource', 'Data Source', 'Custom Data Source', 'service');
  }
}

export default DataSourceControl;