import {
  Component,
  CurrencyPipe,
  DatePipe,
  DecimalPipe,
  Inject,
  NgIf,
  NgFor,
  PercentPipe,
  View
} from 'angular2/angular2';
import { RouterLink, RouteParams } from 'angular2/router';
import { IAction } from '../../../../core/actions/action';
import { Application } from '../../../../core/application';
import { pages } from './app-description';
import { ServicesController } from '../template/services-controller';
import * as JSONAction from '../../../json/json-action-compiler';

@Component({
  selector: 'page'
})
@View({
  template: pages.reduce((markup, page) => {
    return markup +
      `<div *ng-if="id === '${page.id}'">${page.markup}</div>`;
  }, ''),
  directives: [NgIf, NgFor, RouterLink],
  pipes: [CurrencyPipe, DatePipe, DecimalPipe, PercentPipe]
})
export class PageController {
  private id: string;
  private application: Application;
  private actionCompiler = new JSONAction.JSONActionCompiler();

  constructor(
    @Inject(RouteParams) params: RouteParams,
    @Inject(Application) application: Application
  ) {
    this.id = params && params.get('id') || pages[0].id;
    this.application = application;
  }

  getControl(id: string) {
    return this.application.findControl(id);
  }

  generateCssClasses(controlId: string) {
    let control = this.getControl(controlId);

    let cssClasses = [];

    let overrides = control.overrides;
    while (overrides && overrides.name !== '__predefined__') {
      cssClasses.push(`vargin-${controlId}--${overrides.name}`);
      overrides = overrides.parent;
    }

    return cssClasses.join(' ');
  }

  onControlAction(controlId: string, eventName: string) {
    let control = this.getControl(controlId);

    let eventProperty = control.getEvent(eventName);
    let propertyValue = eventProperty && eventProperty.getValue();
    if (propertyValue) {
      (<JSONAction.IJSONAction[]>JSON.parse(propertyValue)).forEach(
        (jsonAction) => {
          this.actionCompiler.decompile(jsonAction).then((action) => {
            action.perform(this.application);
          });
        }
      );
    }
  }

  getDatasource(id: string) {
    return ServicesController.getDatasource(id);
  }
}
