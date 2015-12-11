import {
  Component, Inject, Optional, Renderer, View, ViewContainerRef
} from 'angular2/core';
import { NgFor, NgStyle } from 'angular2/common';

import { Control } from '../../../../core/controls/control';
import { ControlMetadata } from '../../../../core/controls/control-metadata';
import { ContainerControl } from '../../../../core/controls/visual/container-control';
import { DynamicComponent } from '../dynamic-component';
import { BaseComponent } from '../base-component';

@Component({
  selector: 'vargin-container',
  properties: ['control'],
  host: {
    '(click)': 'onClick($event)'
  }
})
@View({
  template: `
    <div class="vargin-component"
        [class.vargin-component_drop-target]="dragEnterCounter > 0"
        [ngStyle]="getControlStyles()"
        (dragleave)="onDragLeave($event)"
        (dragover)="onDragOver($event)"
        (dragenter)="onDragEnter($event)"
        (drop)="onDrop($event)">
      <vargin-dynamic *ngFor="#child of getChildren()"
                      [control]="child"
                      [ngStyle]="getContainerStyles(child)"
                      attr.type="{{child.meta.type}}">
      </vargin-dynamic>
    </div>
  `,
  directives: [DynamicComponent, NgFor, NgStyle]
})
export class ContainerComponent extends BaseComponent {
  constructor(
    @Inject(Renderer) renderer: Renderer,
    @Inject(ViewContainerRef) viewContainer: ViewContainerRef,
    @Optional() @Inject(Control) control?: ContainerControl
  ) {
    super(renderer, viewContainer, control);
  }

  acceptDrop(typesToDrop: string[]) {
    return typesToDrop.indexOf('text/visual') >= 0;
  }
}
