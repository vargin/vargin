import {
  Component, Inject, Optional, Renderer, View, ViewContainerRef
} from 'angular2/core';
import { NgFor, NgStyle } from 'angular2/common';

import { Control } from '../../../../core/controls/control';
import { Overrides } from '../../../../core/overrides/overrides';
import {
  ListControl,
  ListItemControl
} from '../../../../core/controls/visual/list-control';
import { BaseComponent } from '../base-component';
import { DynamicComponent } from '../dynamic-component';

import { UtilsService } from '../../../../core/services/utils-service';

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
      [ngStyle]="getControlStyles()">
      <vargin-dynamic *ngFor="#itemTemplate of itemTemplates"
                      [control]="itemTemplate"
                      [ngStyle]="getContainerStyles(itemTemplate)"
                      attr.type="{{ itemTemplate.meta.type }}">
      </vargin-dynamic>
    </div>
  `,
  directives: [DynamicComponent, NgFor, NgStyle]
})
export class ListComponent extends BaseComponent {
  control: ListControl;
  itemTemplates: Control[];

  constructor(
    @Inject(Renderer) renderer: Renderer,
    @Inject(ViewContainerRef) viewContainer: ViewContainerRef,
    @Optional() @Inject(Control) control?: ListControl
  ) {
    super(renderer, viewContainer, control);

    let itemTemplate = this.control.getTemplate();
    this.itemTemplates = [itemTemplate, itemTemplate, itemTemplate];
  }
}
