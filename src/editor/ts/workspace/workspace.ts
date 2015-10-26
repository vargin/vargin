/// <reference path="../../../../typings/tsd.d.ts" />
import { Component, NgFor, NgIf, View } from 'angular2/angular2';
import { Control } from 'core/controls/control';
import { ContainerComponent } from 'editor/control-components/visual/container-component';
import { ServiceContainerComponent } from 'editor/control-components/service/service-container-component';
import { ApplicationService } from 'core/services/application-service';
import { Workspace, WorkspaceService } from 'editor/services/workspace-service';
import { ControlService } from 'editor/services/control-service';
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
    <ul class="workspace-pager">
      <li class="workspace-pager__page"
          [class.workspace-pager__page_active]="activePageIndex === i"
          *ng-for="#page of getPages(); #i = index"
          (click)="goToPage(i)">
        {{page.name}}
        <button class="workspace-pager__page__remove"
                title="Remove page"
                *ng-if="getPages().length > 1"
                (click)="removePage(page.id)">&#x274c;</button>
      </li>
      <li class="workspace-pager__add-new">
        <button (click)="addPage()">+ Add page</button>
      </li>
    </ul>
    <section class="workspace-editor">
      <div class="workspace-editor__visual">
        <vargin-container [control]="getActivePage()?.root">
        </vargin-container>
      </div>
      <div class="workspace-editor__service">
        <vargin-service-container [control]="workspace?.application?.serviceRoot">
        </vargin-service-container>
      </div>
    </section>
    <footer class="workspace-toolbar">
      <button (click)="startFromScratch()">Start from scratch</button>
      <button (click)="toJSON()">To JSON</button>
      <button (click)="toAngularApp()">To Angular App</button>
      <button (click)="toStaticHTML()">To Static HTML App</button>
    </footer>
  `,
  directives: [ContainerComponent, NgFor, NgIf, ServiceContainerComponent]
})
class VarginWorkspace {
  private workspace: Workspace;
  private activePageIndex: number = 0;

  private jsonCompiler: JSONApplicationCompiler;
  private domStaticCompiler: DOMStaticApplicationCompiler;
  private domAngularCompiler: DOMAngularApplicationCompiler;

  constructor() {
    this.jsonCompiler = new JSONApplicationCompiler();
    this.domStaticCompiler = new DOMStaticApplicationCompiler();
    this.domAngularCompiler = new DOMAngularApplicationCompiler();

    ApplicationService.initialize().then(() => {
      this.workspace = WorkspaceService.create(ApplicationService.current);
    });
  }

  addPage() {
    this.workspace.application.addPage();
  }

  removePage(pageId: string) {
    this. workspace.application.removePage(pageId);

    ControlService.unselectCurrentComponent();
    if (this.activePageIndex >= this.workspace.application.pages.length) {
      this.activePageIndex = this.workspace.application.pages.length - 1;
    }
  }

  goToPage(pageIndex: number) {
    if (pageIndex !== this.activePageIndex) {
      ControlService.unselectCurrentComponent();
      this.activePageIndex = pageIndex;
    }
  }

  getActivePage() {
    if (!this.workspace) {
      return null;
    }

    return this.workspace.application.pages[this.activePageIndex];
  }

  getPages() {
    return this.workspace ? this.workspace.application.pages : [];
  }

  toJSON() {
    this.jsonCompiler.compile(this.workspace.application).then(
      (compiledApplication) => {
        window.open(
          'data:application/json,' + encodeURIComponent(compiledApplication)
        );
      }
    );
  }

  toAngularApp() {
    Promise.all([
      this.domAngularCompiler.compile(this.workspace.application),
      this.jsonCompiler.compile(this.workspace.application)
    ]).then(([compiledApp, jsonCompiledApplication]) => {
      window.open('ng2-compiler/index.html?ts=' + Date.now());

      window['application'] = { compiledApp, jsonCompiledApplication };
    });
  }

  toStaticHTML() {
   this.domStaticCompiler.compile(this.workspace.application).then(
     (compiledApplication) => {
       window.open(
        'data:text/html,' + encodeURIComponent(compiledApplication)
       );
     }
    );
  }

  startFromScratch() {
    this.activePageIndex = 0;

    ApplicationService.reset().then(() => {
      this.workspace = WorkspaceService.create(ApplicationService.current);
    });
  }
}

export default VarginWorkspace;
