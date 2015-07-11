/// <reference path="../../../../../typings/tsd.d.ts" />
import { Component, View } from 'angular2/angular2';

import DataSourceControl from 'core/controls/service/datasource';

@Component({
  selector: 'vargin-datasource',
  properties: ['control']
})

@View({
  template: `<div>{{ control.name }}</div>`
})

class DataSourceComponent{
  private control: DataSourceControl;
}

export default DataSourceComponent;