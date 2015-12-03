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
import {
  ApplicationService
} from '../../../../core/services/application-service';
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
  private actionCompiler = new JSONAction.JSONActionCompiler();

  constructor(@Inject(RouteParams) params: RouteParams) {
    this.id = params && params.get('id') || pages[0].id;
  }

  getControl(id: string) {
    return ApplicationService.findControlById(id);
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
    let control = ApplicationService.findControlById(controlId);

    let eventProperty = control.getEvent(eventName);
    let propertyValue = eventProperty && eventProperty.getValue();
    if (propertyValue) {
      (<JSONAction.IJSONAction[]>JSON.parse(propertyValue)).forEach(
        (jsonAction) => {
          this.actionCompiler.decompile(jsonAction).then((action) => {
            action.perform();
          });
        }
      );
    }
  }

  getDatasource(id: string) {
    return ServicesController.getDatasource(id);
  }
}
