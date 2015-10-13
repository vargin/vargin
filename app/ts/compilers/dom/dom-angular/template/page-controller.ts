/// <reference path="../../../../../../typings/tsd.d.ts" />
import {
  Component,
  Inject,
  NgIf,
  View
} from 'angular2/angular2';
import { RouterLink, RouteParams } from 'angular2/router';
import { IAction } from 'core/actions/action';
import { ApplicationService } from 'services/application-service';
import { pages } from 'app-description';

@Component({
  selector: 'page'
})
@View({
  template: pages.reduce((markup, page) => {
    return markup +
      `<div *ng-if="id === '${page.id}'">${page.markup}</div>`;
  }, ''),
  directives: [NgIf, RouterLink]
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

    if (control.events.has(eventName)) {
      control.events.get(eventName).getValue().forEach(
        (action: IAction) => action.perform()
      );
    }
  }
}
