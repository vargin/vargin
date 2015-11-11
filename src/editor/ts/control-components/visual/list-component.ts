import {
  Component,
  Inject,
  NgFor,
  NgStyle,
  Optional,
  Renderer,
  View,
  ViewContainerRef
} from 'angular2/angular2';

import { Control } from '../../../../core/controls/control';
import { ControlState } from '../../../../core/controls/control-state';
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
      [ng-style]="getControlStyles()">
      <vargin-dynamic *ng-for="#itemTemplate of itemTemplates"
                      [control]="itemTemplate"
                      [ng-style]="getContainerStyles(itemTemplate)"
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
    if (!itemTemplate) {
      itemTemplate = new ListItemControl(UtilsService.uuid(), [
        new ControlState('default', {
          styles: new Map(
            <[string, string][]>[['border', '0.1rem dashed #cccccc']]
          )
        })
      ]);

      this.control.setTemplate(itemTemplate);
    }

    this.itemTemplates = [itemTemplate, itemTemplate, itemTemplate];
  }
}
