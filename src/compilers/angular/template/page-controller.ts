import { Component, DoCheck, Inject, View } from 'angular2/core';
import {
  CurrencyPipe, DatePipe, DecimalPipe, PercentPipe, NgIf, NgFor
} from 'angular2/common';
import { RouterLink, RouteParams } from 'angular2/router';
import { ApplicationPage } from '../../../core/application-page';
import { Control } from '../../../core/controls/control';
import { Trigger } from '../../../core/triggers/trigger';
import { ApplicationService } from './services/application-service';
import { ContainerComponent } from './components/container-component';

@Component({
  selector: 'page'
})
@View({
  template: `
    <div vargin-type="container" [control]="page?.root"></div>
  `,
  directives: [ContainerComponent]
})
export class PageController implements DoCheck {
  private applicationService: ApplicationService;
  private page: ApplicationPage;
  private controlsWithTriggers: Control[];

  constructor(
    @Inject(RouteParams) params: RouteParams,
    @Inject(ApplicationService) applicationService: ApplicationService
  ) {
    this.applicationService = applicationService;

    let pageId = params && params.get('id');
    this.page = pageId ? applicationService.application.pages.find(
      (page) => page.id === pageId
    ) : applicationService.application.pages[0];
  }

  getControl(controlId: string): Control {
    return this.page.root.find(controlId);
  };

  ngDoCheck() {
    this.controlsWithTriggers = [];
    this.findControlsWithTriggers(this.page.root);

    for (var control of this.controlsWithTriggers) {
      for (let trigger of control.triggers) {
        let isTriggerApplicable = trigger.isApplicable(
          (type: string, value: any) => {
            if (type === 'control-binding') {
              return control.getProperty(value).getValue();
            } else if (type === 'data-binding') {
              let dataItem = this.getDataItem(control);

              return dataItem ? dataItem.get(value) : '';
            }

            throw new Error('Not supported');
          }
        );

        if (isTriggerApplicable) {
          trigger.actions.forEach((action) => {
            action.perform(this.applicationService.application, control);
          });
        }
      }
    }
  }

  private findControlsWithTriggers(control: Control) {
    if (control.triggers.length) {
      this.controlsWithTriggers.push(control);
    }

    for (let child of control.getChildren()) {
      this.findControlsWithTriggers(child);
    }
  }

  private getDataItem(control: Control): Map<string, string> {
    while (control.parent) {
      let datasourceProperty = control.parent.getProperty('datasource');
      if (datasourceProperty) {
        return this.applicationService.datasources.get(
          datasourceProperty.getValue()
        ).items[control.parent.getChildren().indexOf(control)];
      }

      control = control.parent;
    }

    return null;
  }
}
