/// <reference path="../../../../../../typings/tsd.d.ts" />
import {
  bind,
  bootstrap,
  Component,
  Inject,
  NgIf,
  Type,
  View
} from 'angular2/angular2';
import {
  LocationStrategy,
  HashLocationStrategy,
  ROUTER_BINDINGS,
  ROUTER_DIRECTIVES,
  RouteConfig,
  RouteParams
} from 'angular2/router';
import { IProperty } from 'core/property';
import { IAction } from 'core/actions/action';
import { Application } from 'core/application';
import { ApplicationService } from 'services/application-service';
import { JSONApplicationCompiler } from 'compilers/json/json-application-compiler';
import { application, pages } from 'app-description';

@Component({
  selector: 'page'
})
@View({
  template: pages.reduce((markup, page) => {
    return markup +
      `<div *ng-if="id === '${page.id}'">${page.markup}</div>`;
  }, ''),
  directives: [NgIf]
})
class PageController {
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

@Component({
  selector: 'angular-app'
})
@View({
  template: '<router-outlet></router-outlet>',
  directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([{
  as: 'default-page',
  path: '/',
  component: PageController
}, {
  as: 'page',
  path: '/page/:id',
  component: PageController
}])
class AppController {
  private application: Application;
  private jsonApplicationCompiler: JSONApplicationCompiler;
  constructor() {
    this.jsonApplicationCompiler = new JSONApplicationCompiler();

    this.application = this.jsonApplicationCompiler.decompile(application);

    ApplicationService.current = this.application;
  }
}

bootstrap(
  AppController,
  [ROUTER_BINDINGS, bind(LocationStrategy).toClass(HashLocationStrategy)]
);
