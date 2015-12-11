import {
  Component,
  Inject,
  Input,
  Optional,
  OnChanges,
  Renderer,
  View,
  ViewContainerRef
} from 'angular2/core';
import { NgIf, NgFor, NgStyle } from 'angular2/common';
import { Control } from '../../../../core/controls/control';
import {
  ListControl,
  ListItemControl
} from '../../../../core/controls/visual/list-control';
import { Datasource } from '../services-controller';
import { templates } from '../app-description';
import { BaseComponent } from './base-component';
import { Application } from '../../../../core/application';

@Component({
  selector: 'vargin-list',
  properties: ['control']
})
@View({
  template: `<vargin-list-item
                *ngFor="#item of datasource.items">
                ${(templates.get(ListControl.getMeta().type) || []).join('')}
             </vargin-list-item>`,
  directives: [ListComponent, NgIf, NgFor]
})
export class ListComponent extends BaseComponent implements OnChanges {
  @Input() list: ListControl;
  @Input() datasource: Datasource;

  private template: ListItemControl;

  constructor(@Inject(Application) application: Application) {
    super(application);
  }

  getControl(controlId: string): Control {
    return this.list.find(controlId);
  };

  ngOnChanges() {
    if (this.list) {
      this.template = this.list.getTemplate();
    }
  }
}
