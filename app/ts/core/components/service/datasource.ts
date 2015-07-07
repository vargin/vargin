/// <reference path="../../../../../typings/tsd.d.ts" />
import { Component, View } from 'angular2/angular2';

import BaseComponent from 'core/components/base';

@Component({
  selector: 'vargin-datasource'
})

@View({
  template: `<div>{{ name }}</div>`
})

class DataSourceComponent extends BaseComponent {
  constructor() {
    super('datasource', 'Data Source', 'Custom Data Source', 'service');
  }
}

export default DataSourceComponent;