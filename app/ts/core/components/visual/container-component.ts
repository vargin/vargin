/// <reference path="../../../../../typings/tsd.d.ts" />
import {
  bind,
  Component,
  Inject,
  NgFor,
  Optional,
  View
} from 'angular2/angular2';

import { IControlComponent } from 'core/components/control-component';

import ControlService from 'services/control-service';

import BaseControl from 'core/controls/base-control';
import ContainerControl from 'core/controls/visual/container-control';

import DynamicComponent from 'core/components/dynamic-component';

@Component({
  selector: 'vargin-container',
  properties: ['control'],
  host: {
    '(dragover)': 'onDragOver($event)',
    '(dragenter)': 'onDragEnter($event)',
    '(drop)': 'onDrop($event)'
  }
})

@View({
  template: `
    <vargin-dynamic *ng-for="#child of control.children" [control]="child">
    </vargin-dynamic>
  `,
  directives: [NgFor, DynamicComponent]
})

class ContainerComponent implements IControlComponent {
  private controlService: ControlService;
  control: ContainerControl;

  constructor(
    @Inject(ControlService) controlService: ControlService,
    @Optional() @Inject(BaseControl) control?: ContainerControl
  ) {
    this.controlService = controlService;
    this.control = control || new ContainerControl();
  }

  onDragOver(e: DragEvent) {
    e.preventDefault();
  }

  onDragEnter(e: DragEvent) {
    e.preventDefault();
  }

  onDrop(e: DragEvent) {
    this.control.children.push(this.controlService.draggedControl);
    e.preventDefault();
  }
}

export default ContainerComponent;