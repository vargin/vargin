/// <reference path="../../../../../../typings/tsd.d.ts" />
import { bootstrap, Component, View } from 'angular2/angular2';
import { IProperty } from 'core/property';
import { IAction } from 'core/actions/action';
import { Application } from 'core/application';
import { ApplicationService } from 'services/application-service';
import { JSONApplicationCompiler } from 'compilers/json/json-application-compiler';
import { markup, application } from 'app-description';

@Component({
  selector: 'angular-app'
})

@View({
  template: markup
})

class AppController {
  private application: Application;
  private jsonApplicationCompiler: JSONApplicationCompiler;
  constructor() {
    this.jsonApplicationCompiler = new JSONApplicationCompiler();

    this.application = this.jsonApplicationCompiler.decompile(application);

    ApplicationService.current = this.application;
  }

  getControl(id: string) {
    return ApplicationService.findControlById(id);
  }

  onControlAction(controlId: string, eventName: string) {
    var control = ApplicationService.findControlById(controlId);

    if (control.events.has(eventName)) {
      control.events.get(eventName).getValue().forEach(
        (action: IAction) => action.perform()
      );
    }
  }
}

bootstrap(AppController);