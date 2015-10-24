/// <reference path="../../../../../../typings/tsd.d.ts" />
import {
  bootstrap,
  Component,
  provide,
  Type,
  View
} from 'angular2/angular2';
import {
  LocationStrategy,
  HashLocationStrategy,
  ROUTER_DIRECTIVES,
  ROUTER_PRIMARY_COMPONENT,
  ROUTER_PROVIDERS,
  RouteConfig
} from 'angular2/router';
import { Application } from 'core/application';
import { ApplicationService } from 'services/application-service';
import { JSONApplicationCompiler } from 'compilers/json/json-application-compiler';
import { PageController } from 'compilers/dom/dom-angular/template/page-controller';
import { application } from 'app-description';

import { REGISTRY as VISUAL_CONTROLS } from 'core/controls/visual/_registry';
import { REGISTRY as SERVICE_CONTROLS } from 'core/controls/service/_registry';

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
  private dependencies: Type[] = [
    ...VISUAL_CONTROLS,
    ...SERVICE_CONTROLS
  ];
}

(new JSONApplicationCompiler()).decompile(
  application
).then((decompiledApplication) => {
  ApplicationService.current = decompiledApplication;

  bootstrap(
    AppController,
    [
      ROUTER_PROVIDERS,
      provide(LocationStrategy, { useClass: HashLocationStrategy }),
      provide(ROUTER_PRIMARY_COMPONENT, { useValue: AppController })
    ]
  );
});

