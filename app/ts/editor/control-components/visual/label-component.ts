/// <reference path="../../../../../typings/tsd.d.ts" />
import {
  Component,
  Inject,
  NgStyle,
  Optional,
  Renderer,
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
    @Inject(Renderer) renderer: Renderer,
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
