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
      [ngStyle]="controlStyles">
      <vargin-dynamic *ngFor="#itemTemplate of templates.controls; #i = index"
                      [control]="itemTemplate"
                      [ngStyle]="templates.styles[i]"
                      attr.type="{{ itemTemplate.meta.type }}">
      </vargin-dynamic>
    </div>
  `,
  directives: [DynamicComponent, NgFor, NgStyle]
})
export class ListComponent extends BaseComponent {
  control: ListControl;

  private templates: {
    controls: Control[],
    styles: { [key: string]: string; }[]
  };

  constructor(
    @Inject(Renderer) renderer: Renderer,
    @Inject(ViewContainerRef) viewContainer: ViewContainerRef,
    @Optional() @Inject(Control) control?: ListControl
  ) {
    super(renderer, viewContainer, control);

    let template = this.control.getTemplate();
    let templateStyles = this.getControlContainerStyles(template);

    this.templates = {
      controls: [template, template, template],
      styles: [templateStyles, templateStyles, templateStyles]
    };
  }
}
