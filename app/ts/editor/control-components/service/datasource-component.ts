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
import { DatasourceControl } from 'core/controls/service/datasource-control';
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
class DatasourceComponent extends BaseComponent {
  control: DatasourceControl;

  constructor(
    @Inject(Renderer) renderer: Renderer,
    @Inject(ViewContainerRef) viewContainer: ViewContainerRef,
    @Optional() @Inject(Control) control?: DatasourceControl
  ) {
    super(renderer, viewContainer, control);
  }
}

export default DatasourceComponent;
