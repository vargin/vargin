/// <reference path="../../../../typings/tsd.d.ts" />
import { Component, View } from 'angular2/angular2';
import ContainerComponent from 'core/components/visual/container-component';
import { Application } from 'core/application';
import { ApplicationPage } from 'core/application-page';
import { Workspace, WorkspaceService } from 'services/workspace-service';
import { UtilsService } from 'services/utils-service';
import {
  JsonApplicationCompiler
} from 'compilers/json/json-application-compiler';
import {
  DOMStaticApplicationCompiler
} from 'compilers/dom/dom-static/dom-static-application-compiler';

const DEFAULT_SERIALIZED_APPLICATION = {
  id: UtilsService.uuid(),
  name: '(Default App)',
  description: '(Default App)',
  pages: [{
    id: UtilsService.uuid(),
    name: '(Default Page)',
    root: {
      type: 'container',
      children: [{
        type: 'label',
        parameters: {
          properties: [['text', '[Root] Label1']],
          styles: [
            ['color', '#0000ff'], ['text-decoration', 'line-through']
          ]
        }
      }, {
        type: 'button',
        parameters: { styles: [['border', '3px dashed blue']] }
      }, {
        type: 'label',
        parameters: { properties: [['text', '[Root] Label2']] }
      }, {
        type: 'button'
      }, {
        type: 'range',
        parameters: { styles: [['opacity', '0.5']] }
      }, {
        type: 'container',
        children: [{
          type: 'label',
          parameters: { properties: [['text', '[Nested] Label1']] }
        }, {
          type: 'button'
        }, {
          type: 'label',
          parameters: { properties: [['text', '[Nested] Label2']] }
        }, {
          type: 'button'
        }, {
          type: 'container',
          children: [{
            type: 'label',
            parameters: { properties: [['text', '[Nested-1] Label1']] }
          }, {
            type: 'button',
            parameters: { events: null }
          }, {
            type: 'label',
            parameters: { properties: [['text', '[Nested-1] Label2']] }
          }, {
            type: 'button'
          }]
        }]
      }]
    }
  }]
};

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

    WorkspaceService.create(
      this.jsonCompiler.decompile(
        JSON.stringify(DEFAULT_SERIALIZED_APPLICATION)
      )
    ).then(
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