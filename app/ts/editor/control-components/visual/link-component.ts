/// <reference path="../../../../../typings/tsd.d.ts" />
import { Component, Inject, NgStyle, Optional, View } from 'angular2/angular2';

import { Control } from 'core/controls/control';
import { LinkControl } from 'core/controls/visual/link-control';
import { ControlService } from 'services/control-service';
import { BaseComponent } from 'editor/control-components/base-component';

@Component({
  selector: 'vargin-link',
  properties: ['control'],
  host: {
    '(click)': 'onClick($event)'
  }
})
@View({
  template: `
    <a
      href="javascript:void(0)"
      [title]="control.title.getValue()"
      [target]="control.target.getValue()"
      [ng-style]="getControlStyles()">
      {{ control.text.getValue() }}
    </a>
  `,
  directives: [NgStyle]
})
class LinkComponent extends BaseComponent {
  control: LinkControl;

  constructor(@Optional() @Inject(Control) control?: LinkControl) {
    super(control || ControlService.create(LinkControl));
  }
}

export default LinkComponent;
