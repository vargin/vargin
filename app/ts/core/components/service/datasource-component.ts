/// <reference path="../../../../../typings/tsd.d.ts" />
import {
  Component,
  Inject,
  Optional,
  View
} from 'angular2/angular2';

import { IControlComponent } from 'core/components/control-component';

import { Control } from 'core/controls/control';
import { DataSourceControl } from 'core/controls/service/datasource-control';
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

  constructor(@Optional() @Inject(Control) control?: DataSourceControl) {
    this.control = control || ControlService.create(DataSourceControl);
  }
}

export default DataSourceComponent;