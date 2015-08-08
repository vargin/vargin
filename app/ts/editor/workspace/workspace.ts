/// <reference path="../../../../typings/tsd.d.ts" />
import { Component, View } from 'angular2/angular2';
import ContainerComponent from 'editor/control-components/visual/container-component';
import { ApplicationService } from 'services/application-service';
import { Workspace, WorkspaceService } from 'services/workspace-service';
import {
  JSONApplicationCompiler
} from 'compilers/json/json-application-compiler';
import {
  DOMAngularApplicationCompiler
} from 'compilers/dom/dom-angular/dom-angular-application-compiler';

@Component({
  selector: 'vargin-workspace'
})
@View({
  template: `
    <header class="workspace-toolbar">
      <button (click)="toJSON('a')">To JSON</button>
      <button (click)="toAngularApp()">To Angular App</button>
      <a href="{{toStaticHTML()}}" target="_blank">Static HTML Page</a>
    </header>
    <vargin-container [control]="getRoot()"></vargin-container>
  `,
  directives: [ContainerComponent]
})
class VarginWorkspace {
  private workspace: Workspace;
  private jsonCompiler: JSONApplicationCompiler;
  private domCompiler: DOMAngularApplicationCompiler;

  constructor() {
    this.jsonCompiler = new JSONApplicationCompiler();
    this.domCompiler = new DOMAngularApplicationCompiler();

    WorkspaceService.create(ApplicationService.current).then(
      (workspace) => this.workspace = workspace
    );
  }

  getRoot() {
    return this.workspace.application.pages[0].root;
  }

  toJSON() {
    console.log(
      'JSON control: %s', this.jsonCompiler.compile(this.workspace.application)
    );
  }

  toAngularApp() {
    var appIframe = document.createElement('iframe');
    appIframe.src = 'ng-compiler/index.html';

    appIframe.onload = () => {
      var compiledApp = this.domCompiler.compile(this.workspace.application);
      var jsonCompiledApplication = this.jsonCompiler.compile(
        this.workspace.application
      );

      var bootstrapScript = document.createElement('script');
      bootstrapScript.text = `
        System.register("app-description", [], function(exports) {
          return {
            setters: [],
            execute: function() {
              exports('markup', '${compiledApp}');
              exports('application', '${jsonCompiledApplication}')
            }
          }
        });
        System.import(
          'compilers/dom/dom-angular/template/app-controller'
        ).catch(function(e) { console.error(e); })
      `;

      appIframe.contentDocument.head.appendChild(bootstrapScript);
    };

    document.body.appendChild(appIframe);
  }

  toStaticHTML() {
    return 'data:text/html,' + encodeURIComponent(
      this.domCompiler.compile(this.workspace.application)
    );
  }
}

export default VarginWorkspace;