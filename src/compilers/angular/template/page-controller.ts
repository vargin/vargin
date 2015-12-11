import { Component, DoCheck, Inject, View } from 'angular2/core';
import {
  CurrencyPipe, DatePipe, DecimalPipe, PercentPipe, NgIf, NgFor
} from 'angular2/common';
import { RouterLink, RouteParams } from 'angular2/router';
import { Application } from '../../../core/application';
import { ApplicationPage } from '../../../core/application-page';
import { Control } from '../../../core/controls/control';
import { Trigger } from '../../../core/triggers/trigger';
import { pages } from './app-description';
import { BaseComponent } from './components/base-component';
import { ListComponent } from './components/list-component';

@Component({
  selector: 'page'
})
@View({
  template: pages.reduce((markup, page) => {
    return markup +
      `<div *ngIf="page.id === '${page.id}'">${page.markup}</div>`;
  }, ''),
  directives: [NgIf, NgFor, RouterLink, ListComponent],
  pipes: [CurrencyPipe, DatePipe, DecimalPipe, PercentPipe]
})
export class PageController extends BaseComponent implements DoCheck {
  private id: string;
  private page: ApplicationPage;
  private controlsWithTriggers: Control[];

  constructor(
    @Inject(RouteParams) params: RouteParams,
    @Inject(Application) application: Application
  ) {
    super(application);

    let pageId = params && params.get('id');
    this.page = pageId ?
      application.pages.find((page) => page.id === pageId) :
      application.pages[0];
  }

  getControl(controlId: string): Control {
    return this.page.root.find(controlId);
  };

  ngDoCheck() {
    if (!this.controlsWithTriggers) {
      this.controlsWithTriggers = [];
      this.findControlsWithTriggers(this.page.root);
    }

    for (var control of this.controlsWithTriggers) {
      for (let trigger of control.triggers) {
        let isTriggerApplicable = trigger.isApplicable(
          (type: string, value: any) => {
            if (type === 'control-binding') {
              return control.getProperty(value).getValue();
            }

            throw new Error('Not supported');
          }
        );

        if (isTriggerApplicable) {
          trigger.actions.forEach((action) => action.perform(this.application));
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
}
