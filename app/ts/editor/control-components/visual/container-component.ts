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

import { Control } from 'core/controls/control';
import { ContainerControl } from 'core/controls/visual/container-control';
import DynamicComponent from 'editor/control-components/dynamic-component';

import { ControlService } from 'services/control-service';

@Component({
  selector: 'vargin-container',
  properties: ['control'],
  host: {
    '(^click)': 'onClick($event)'
  }
})
@View({
  template: `
    <div
      class="vargin-component"
      [ng-style]="control.serializeStyles()"
      (dragover)="onDragOver($event)"
      (dragenter)="onDragEnter($event)"
      (drop)="onDrop($event)">
      <vargin-dynamic *ng-for="#child of control.getChildren()" [control]="child" attr.type="{{child.meta.type}}">
      </vargin-dynamic>
    </div>
  `,
  directives: [DynamicComponent, NgFor, NgStyle]
})
class ContainerComponent {
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

  onClick(e) {
    e.stopPropagation();
    e.preventDefault();

    ControlService.selectControl(this.control);
  }
}

export default ContainerComponent;
