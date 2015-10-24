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

import { ButtonControl } from 'core/controls/visual/button-control';
import { LabelControl } from 'core/controls/visual/label-control';
import { LinkControl } from 'core/controls/visual/link-control';
import { ListControl } from 'core/controls/visual/list-control';
import { ListItemControl } from 'core/controls/visual/list-control';
import { RangeControl } from 'core/controls/visual/range-control';
import { TextInputControl } from 'core/controls/visual/text-input-control';
import { DatasourceControl } from 'core/controls/service/datasource-control';

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
    ButtonControl,
    LabelControl,
    LinkControl,
    ListControl,
    ListItemControl,
    RangeControl,
    TextInputControl,

    DatasourceControl
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

