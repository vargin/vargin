/// <reference path="../../../../../typings/tsd.d.ts" />
import {
  Component,
  DomRenderer,
  Inject,
  NgFor,
  NgStyle,
  Optional,
  View,
  ViewContainerRef
} from 'angular2/angular2';

import { Control } from 'core/controls/control';
import { ControlMetadata } from 'core/controls/control-metadata';
import { ContainerControl } from 'core/controls/visual/container-control';
import { DynamicComponent } from 'editor/control-components/dynamic-component';
import { BaseComponent } from 'editor/control-components/base-component';

import { ControlService } from 'services/control-service';

@Component({
  selector: 'vargin-container',
  properties: ['control'],
  host: {
    '(click)': 'onClick($event)'
  }
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
class ContainerComponent extends BaseComponent {
  control: ContainerControl;

  constructor(
    @Inject(DomRenderer) renderer: DomRenderer,
    @Inject(ViewContainerRef) viewContainer: ViewContainerRef,
    @Optional() @Inject(Control) control?: ContainerControl
  ) {
    super(
      control || ControlService.create(ContainerControl),
      renderer,
      viewContainer
    );
  }

  acceptDrop(typesToDrop: string[]) {
    return typesToDrop.indexOf('text/visual') >= 0;
  }
}

export default ContainerComponent;
