/// <reference path="../../../../../typings/tsd.d.ts" />
import BaseControl from 'core/controls/base-control';

class DataSourceControlProperties {
}

class DataSourceControl extends BaseControl<DataSourceControlProperties> {
  constructor() {
    super('datasource', 'Data Source', 'Custom Data Source', 'service');
  }

  clone() {
    return new DataSourceControl();
  }
}

export default DataSourceControl;