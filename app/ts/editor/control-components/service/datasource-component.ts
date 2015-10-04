/// <reference path="../../../../../typings/tsd.d.ts" />
import {
  Component,
  Inject,
  Optional,
  Renderer,
  View,
  ViewContainerRef
} from 'angular2/angular2';

import { Control } from 'core/controls/control';
import { DataSourceControl } from 'core/controls/service/datasource-control';
import { ControlService } from 'services/control-service';
import { BaseComponent } from 'editor/control-components/base-component';

@Component({
  selector: 'vargin-datasource',
  properties: ['control'],
  host: {
    '(click)': 'onClick($event)'
  }
})
@View({
  template: `<div class="vargin-service-component vargin-service-component__datasource"></div>`
})
class DataSourceComponent extends BaseComponent {
  control: DataSourceControl;

  constructor(
    @Inject(Renderer) renderer: Renderer,
    @Inject(ViewContainerRef) viewContainer: ViewContainerRef,
    @Optional() @Inject(Control) control?: DataSourceControl
  ) {
    super(
      control || ControlService.create(DataSourceControl),
      renderer,
      viewContainer
    );
  }
}

export default DataSourceComponent;
