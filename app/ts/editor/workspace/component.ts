/// <reference path="../../../../typings/tsd.d.ts" />
import { Component, View } from 'angular2/angular2';
import ContainerComponent from 'core/components/visual/container-component';
import { ApplicationService } from 'services/application-service';
import { Workspace, WorkspaceService } from 'services/workspace-service';
import {
  JsonApplicationCompiler
} from 'compilers/json/json-application-compiler';
import {
  DOMStaticApplicationCompiler
} from 'compilers/dom/dom-static/dom-static-application-compiler';

@Component({
  selector: 'vargin-workspace'
})
@View({
  template: `
    <header class="workspace-toolbar">
      <button (click)="toJSON()">To JSON</button>
      <a href="{{toStaticHTML()}}" target="_blank">Static HTML Page</a>
    </header>
    <vargin-container [control]="getRoot()"></vargin-container>
  `,
  directives: [ContainerComponent]
})
class VarginWorkspace {
  private workspace: Workspace;
  private jsonCompiler: JsonApplicationCompiler;
  private domStaticHTMLCompiler: DOMStaticApplicationCompiler;

  constructor() {
    this.jsonCompiler = new JsonApplicationCompiler();
    this.domStaticHTMLCompiler = new DOMStaticApplicationCompiler();

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

  toStaticHTML() {
    return 'data:text/html,' + encodeURIComponent(
      this.domStaticHTMLCompiler.compile(this.workspace.application)
    );
  }
}

export default VarginWorkspace;