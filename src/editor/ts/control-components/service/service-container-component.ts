import {
  Component,
  Inject,
  NgFor,
  NgStyle,
  OnChanges,
  Optional,
  Renderer,
  View,
  ViewContainerRef
} from 'angular2/angular2';

import { Control } from '../../../../core/controls/control';
import { ContainerControl } from '../../../../core/controls/visual/container-control';
import { DynamicComponent } from '../dynamic-component';
import { BaseComponent } from '../base-component';

@Component({
  selector: 'vargin-service-container',
  properties: ['control']
})
@View({
  template: `
    <div
      class="vargin-component"
      [class.vargin-component_drop-target]="dragEnterCounter > 0"
      [ng-style]="getControlStyles()"
      (dragleave)="onDragLeave($event)"
      (dragover)="onDragOver($event)"
      (dragenter)="onDragEnter($event)"
      (drop)="onDrop($event)">
      <vargin-dynamic *ng-for="#child of getChildren()"
                      [control]="child"
                      [ng-style]="getContainerStyles(child)"
                      attr.type="{{child.meta.type}}">
      </vargin-dynamic>
    </div>
  `,
  directives: [DynamicComponent, NgFor, NgStyle]
})
export class ServiceContainerComponent extends BaseComponent implements OnChanges  {
  control: ContainerControl;

  constructor(
    @Inject(Renderer) renderer: Renderer,
    @Inject(ViewContainerRef) viewContainer: ViewContainerRef,
    @Optional() @Inject(Control) control: ContainerControl
  ) {
    super(renderer, viewContainer, control);
  }

  acceptDrop(typesToDrop: string[]) {
    return typesToDrop.indexOf('text/service') >= 0;
  }

  ngOnChanges() {
    if (this.control) {
      this.setupStyles();
    }
  }

  private setupStyles() {
    this.control.getStyle('align-items').setValue('stretch');
    this.control.getStyle('display').setValue('flex');
    this.control.getStyle('min-height').setValue('0');
    this.control.getStyle('min-width').setValue('0');
  }
}
