/// <reference path="../../../../../typings/tsd.d.ts" />
import {
  Component,
  Inject,
  Optional,
  View
} from 'angular2/angular2';

import { IControlComponent } from 'core/components/control-component';

import BaseControl from 'core/controls/base-control';
import DataSourceControl from 'core/controls/service/datasource-control';
import { ControlService } from 'services/control-service';

@Component({
  selector: 'vargin-datasource',
  properties: ['control']
})

@View({
  template: `<div>{{ control.meta.name }}</div>`
})

class DataSourceComponent implements IControlComponent {
  control: DataSourceControl;

  constructor(@Optional() @Inject(BaseControl) control?: DataSourceControl) {
    this.control = control ||
      ControlService.create<DataSourceControl>('datasource');
  }
}

export default DataSourceComponent;