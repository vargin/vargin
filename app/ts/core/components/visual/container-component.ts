/// <reference path="../../../../../typings/tsd.d.ts" />
import {
  bind,
  Component,
  Inject,
  NgFor,
  NgStyle,
  Optional,
  View
} from 'angular2/angular2';

import { IControlComponent } from 'core/components/control-component';

import { Control } from 'core/controls/control';
import { ContainerControl } from 'core/controls/visual/container-control';
import DynamicComponent from 'core/components/dynamic-component';

import { ControlService } from 'services/control-service';

@Component({
  selector: 'vargin-container',
  properties: ['control']
})
@View({
  template: `
    <div
      class="vargin-component"
      [ng-style]="control.serializeStyles()"
      (dragover)="onDragOver($event)"
      (dragenter)="onDragEnter($event)"
      (drop)="onDrop($event)">
      <vargin-dynamic *ng-for="#child of control.getChildren()" [control]="child">
      </vargin-dynamic>
    </div>
  `,
  directives: [DynamicComponent, NgFor, NgStyle]
})
class ContainerComponent implements IControlComponent {
  control: ContainerControl;

  constructor(
    @Optional() @Inject(Control) control?: ContainerControl
  ) {
    this.control = control || ControlService.create(ContainerControl);
  }

  onDragOver(e: DragEvent) {
    e.preventDefault();
  }

  onDragEnter(e: DragEvent) {
    e.preventDefault();
  }

  onDrop(e: DragEvent) {
    this.control.addChild(
      ControlService.createByType(e.dataTransfer.getData('text/plain'))
    );
    e.preventDefault();
  }
}

export default ContainerComponent;
