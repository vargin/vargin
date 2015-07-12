/// <reference path="../../../../../typings/tsd.d.ts" />
import {
  Component,
  Inject,
  Optional,
  View
} from 'angular2/angular2';

import BaseControl from 'core/controls/base-control';
import DataSourceControl from 'core/controls/service/datasource-control';

@Component({
  selector: 'vargin-datasource',
  properties: ['control']
})

@View({
  template: `<div>{{ control.name }}</div>`
})

class DataSourceComponent{
  private control: DataSourceControl;

  constructor(
    @Optional() @Inject(BaseControl) control?: DataSourceControl
  ) {
    this.control = control || new DataSourceControl();
  }
}

export default DataSourceComponent;