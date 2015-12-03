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
import { Application } from '../../../../core/application';
import { JSONApplicationCompiler } from '../../../json/json-application-compiler';
import { PageController } from './page-controller';
import { application } from './app-description';

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
class AppController {}

(new JSONApplicationCompiler()).decompile(
  application
).then((decompiledApplication) => {
  bootstrap(
    AppController,
    [
      ROUTER_PROVIDERS,
      provide(LocationStrategy, { useClass: HashLocationStrategy }),
      provide(ROUTER_PRIMARY_COMPONENT, { useValue: AppController }),
      provide(Application, { useValue: decompiledApplication })
    ]
  );
});

