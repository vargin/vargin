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
export class DatasourceComponent extends BaseComponent {
  constructor(
    @Inject(Renderer) renderer: Renderer,
    @Inject(ViewContainerRef) viewContainer: ViewContainerRef,
    @Optional() @Inject(Control) control?: Control
  ) {
    super(renderer, viewContainer, control);
  }
}
