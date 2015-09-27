/// <reference path="../../../../../typings/tsd.d.ts" />
import {
  Component,
  DomRenderer,
  Inject,
  NgStyle,
  Optional,
  View,
  ViewContainerRef
} from 'angular2/angular2';

import { Control } from 'core/controls/control';
import { LabelControl } from 'core/controls/visual/label-control';
import { ControlService } from 'services/control-service';

import { BaseComponent } from 'editor/control-components/base-component';

@Component({
  selector: 'vargin-label',
  properties: ['control'],
  host: {
    '(click)': 'onClick($event)'
  }
})
@View({
  template: `
    <span [ng-style]="getControlStyles()">
    {{ control.text.getValue() }}
    </span>
  `,
  directives: [NgStyle]
})
class LabelComponent extends BaseComponent {
  control: LabelControl;

  constructor(
    @Inject(DomRenderer) renderer: DomRenderer,
    @Inject(ViewContainerRef) viewContainer: ViewContainerRef,
    @Optional() @Inject(Control) control?: LabelControl
  ) {
    super(
      control || ControlService.create(LabelControl),
      renderer,
      viewContainer
    );
  }
}

export default LabelComponent;
