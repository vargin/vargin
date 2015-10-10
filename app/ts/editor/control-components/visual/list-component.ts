/// <reference path="../../../../../typings/tsd.d.ts" />
import {
  Component,
  Inject,
  NgFor,
  NgStyle,
  Optional,
  Renderer,
  View,
  ViewContainerRef
} from 'angular2/angular2';

import { Control } from 'core/controls/control';
import { ContainerControl } from 'core/controls/visual/container-control';
import { ListControl } from 'core/controls/visual/list-control';
import { BaseComponent } from 'editor/control-components/base-component';
import { DynamicComponent } from 'editor/control-components/dynamic-component';

import { ControlService } from 'services/control-service';
import { UtilsService } from 'services/utils-service';

@Component({
  selector: 'vargin-list',
  properties: ['control'],
  host: {
    '(click)': 'onClick($event)'
  }
})
@View({
  template: `
    <div
      class="vargin-component"
      [ng-style]="getControlStyles()">
      <vargin-dynamic *ng-for="#itemTemplate of itemTemplates"
                      [control]="itemTemplate"
                      [ng-style]="getContainerStyles(itemTemplate)"
                      attr.type="{{itemTemplate.meta.type}}">
      </vargin-dynamic>
    </div>
  `,
  directives: [DynamicComponent, NgFor, NgStyle]
})
export default class ListComponent extends BaseComponent {
  control: ListControl;
  itemTemplates: Control[];

  constructor(
    @Inject(Renderer) renderer: Renderer,
    @Inject(ViewContainerRef) viewContainer: ViewContainerRef,
    @Optional() @Inject(Control) control?: ListControl
  ) {
    super(renderer, viewContainer, control);

    let itemTemplate: Control = null;
    let children = this.control.getChildren();

    if (children.length === 0) {
      itemTemplate = new ContainerControl(UtilsService.uuid(), {
        styles: new Map([['border', '0.1rem dashed #cccccc']])
      });
      this.control.addChild(itemTemplate);
    } else {
      itemTemplate = children[0];
    }

    this.itemTemplates = [itemTemplate, itemTemplate, itemTemplate];
  }
}
