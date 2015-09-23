/// <reference path="../../../../../typings/tsd.d.ts" />
import {
  Component,
  Inject,
  NgFor,
  NgStyle,
  OnChanges,
  Optional,
  View
} from 'angular2/angular2';

import { Control } from 'core/controls/control';
import { ControlGroup } from 'core/controls/control-group';
import { ControlMetadata } from 'core/controls/control-metadata';
import { ContainerControl } from 'core/controls/visual/container-control';
import { DynamicComponent } from 'editor/control-components/dynamic-component';
import { BaseComponent } from 'editor/control-components/base-component';

import { ControlService } from 'services/control-service';

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
      <vargin-dynamic *ng-for="#child of control.getChildren()"
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

  constructor(@Optional() @Inject(Control) control: ContainerControl) {
    super(control || ControlService.create(ContainerControl));

    this.setupStyles();
  }

  acceptDrop(controlType: string) {
    return !!ControlGroup.get('service').items.find((meta: ControlMetadata) => {
      return meta.type === controlType;
    });
  }

  onChanges() {
    if (this.control) {
      this.setupStyles();
    }
  }

  private setupStyles() {
    this.control.styles.get('align-items').setValue('center');
    this.control.styles.get('display').setValue('flex');
    this.control.styles.get('min-height').setValue('0');
    this.control.styles.get('min-width').setValue('0');
  }
}
