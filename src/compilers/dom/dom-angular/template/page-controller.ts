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

  constructor(@Inject(RouteParams) params: RouteParams) {
    this.id = params && params.get('id') || pages[0].id;
  }

  getControl(id: string) {
    return ApplicationService.findControlById(id);
  }

  onControlAction(controlId: string, eventName: string) {
    let control = ApplicationService.findControlById(controlId);

    let eventProperty = control.getEvent(eventName);
    if (eventProperty) {
      eventProperty.getValue().forEach((action: IAction) => action.perform());
    }
  }

  getDatasource(id: string) {
    return ServicesController.getDatasource(id);
  }
}
