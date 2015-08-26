/// <reference path="../../../../typings/tsd.d.ts" />
import { Component, View } from 'angular2/angular2';
import ContainerComponent from 'editor/control-components/visual/container-component';
import { ApplicationService } from 'services/application-service';
import { Workspace, WorkspaceService } from 'services/workspace-service';
import {
  JSONApplicationCompiler
} from 'compilers/json/json-application-compiler';
import {
  DOMStaticApplicationCompiler
} from 'compilers/dom/dom-static/dom-static-application-compiler';
import {
  DOMAngularApplicationCompiler
} from 'compilers/dom/dom-angular/dom-angular-application-compiler';

@Component({
  selector: 'vargin-workspace'
})
@View({
  template: `
    <header class="workspace-toolbar">
      <button (click)="startFromScratch()">Start from scratch</button>
      <button (click)="toJSON('a')">To JSON</button>
      <button (click)="toAngularApp()">To Angular App</button>
      <button (click)="toStaticHTML()">To Static HTML App</button>
    </header>
    <vargin-container [control]="getRoot()"></vargin-container>
  `,
  directives: [ContainerComponent]
})
class VarginWorkspace {
  private workspace: Workspace;
  private jsonCompiler: JSONApplicationCompiler;
  private domStaticCompiler: DOMStaticApplicationCompiler;
  private domAngularCompiler: DOMAngularApplicationCompiler;

  constructor() {
    this.jsonCompiler = new JSONApplicationCompiler();
    this.domStaticCompiler = new DOMStaticApplicationCompiler();
    this.domAngularCompiler = new DOMAngularApplicationCompiler();

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
    var compiledApp = this.domAngularCompiler.compile(
      this.workspace.application
    );

    var jsonCompiledApplication = this.jsonCompiler.compile(
      this.workspace.application
    );

    var angularAppWindow = window.open(
      'ng-compiler/index.html?ts=' + Date.now()
    );

    angularAppWindow.addEventListener('load', function onAppWindowLoad() {
      angularAppWindow.removeEventListener('load', onAppWindowLoad);

      angularAppWindow.postMessage({
        compiledApp: compiledApp,
        jsonCompiledApplication: jsonCompiledApplication
      }, '*');
    });
  }

  toStaticHTML() {
    window.open(
      'data:text/html,' + encodeURIComponent(
        this.domStaticCompiler.compile(this.workspace.application)
      )
    );
  }

  startFromScratch() {
    ApplicationService.reset();

    WorkspaceService.create(ApplicationService.current).then(
      (workspace) => this.workspace = workspace
    );
  }
}

export default VarginWorkspace;