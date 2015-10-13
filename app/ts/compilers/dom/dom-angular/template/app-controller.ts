/// <reference path="../../../../../../typings/tsd.d.ts" />
import {
  bind,
  bootstrap,
  Component,
  View
} from 'angular2/angular2';
import {
  LocationStrategy,
  HashLocationStrategy,
  ROUTER_BINDINGS,
  ROUTER_DIRECTIVES,
  ROUTER_PRIMARY_COMPONENT,
  RouteConfig
} from 'angular2/router';
import { Application } from 'core/application';
import { ApplicationService } from 'services/application-service';
import { JSONApplicationCompiler } from 'compilers/json/json-application-compiler';
import { PageController } from 'compilers/dom/dom-angular/template/page-controller';
import { application } from 'app-description';

@Component({
  selector: 'angular-app'
})
@View({
  template: '<router-outlet></router-outlet>',
  directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([{
  as: 'Default',
  path: '/',
  component: PageController
}, {
  as: 'Page',
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
  [
    ROUTER_BINDINGS,
    bind(LocationStrategy).toClass(HashLocationStrategy),
    bind(ROUTER_PRIMARY_COMPONENT).toValue(AppController)
  ]
);
