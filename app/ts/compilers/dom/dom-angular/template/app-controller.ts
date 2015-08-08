/// <reference path="../../../../../../typings/tsd.d.ts" />
import { bootstrap, Component, View } from 'angular2/angular2';
import { IProperty } from 'core/property';
import { Application } from 'core/application';
import { ApplicationService } from 'services/application-service';;
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

  onControlAction(controlId: string, action: string) {
    alert('Control with id: ' + controlId + ' requested action: ' + action);

    var control = ApplicationService.findControlById(controlId);

    control.meta.supportedProperties.forEach((property, propertyKey) => {
      var property = <IProperty<string>>control[propertyKey];
      alert(property.getName() + '=' + property.getValue());
    });
  }
}

bootstrap(AppController);