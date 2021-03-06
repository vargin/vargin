import { Component, Inject, View } from 'angular2/core';
import { NgFor, NgIf } from 'angular2/common';
import { Control } from '../../../core/controls/control';
import { ContainerComponent } from '../control-components/visual/container-component';
import { ServiceContainerComponent } from '../control-components/service/service-container-component';
import { Workspace, WorkspaceService } from '../services/workspace-service';
import { ComponentService } from '../services/component-service';
import {
  JSONApplicationCompiler,
  IJSONApplication
} from '../../../compilers/json/json-application-compiler';
import {
  AngularApplicationCompiler,
  ICompiledAngularApplication
} from '../../../compilers/angular/angular-application-compiler';

@Component({
  selector: 'vargin-workspace'
})
@View({
  template: `
    <ul class="workspace-pager">
      <li class="workspace-pager__page"
          [class.workspace-pager__page_active]="activePageIndex === i"
          *ngFor="#page of getPages(); #i = index"
          (click)="goToPage(i)">
        {{page.name}}
        <button class="workspace-pager__page__remove"
                title="Remove page"
                *ngIf="getPages().length > 1"
                (click)="removePage(page.id)">&#x274c;</button>
      </li>
      <li class="workspace-pager__add-new">
        <button (click)="addPage()">+ Add page</button>
      </li>
    </ul>
    <section class="workspace-editor">
      <div class="workspace-editor__visual">
        <div vargin-type="container" [control]="getActivePage()?.root"></div>
      </div>
      <div class="workspace-editor__service">
        <div vargin-type="service-container" [control]="workspace?.application?.serviceRoot">
        </div>
      </div>
    </section>
    <footer class="workspace-toolbar">
      <button (click)="startFromScratch()">Start from scratch</button>
      <button (click)="toJSON()">Get JSON</button>
      <button (click)="toAngularApp()">Compile and Run</button>
      <button (click)="toStaticHTML()">Get static HTML page</button>
    </footer>
  `,
  directives: [ContainerComponent, NgFor, NgIf, ServiceContainerComponent]
})
class VarginWorkspace {
  private workspace: Workspace;
  private activePageIndex: number = 0;

  private jsonCompiler: JSONApplicationCompiler;
  private angularCompiler: AngularApplicationCompiler;

  constructor(@Inject(Workspace) workspace: Workspace) {
    this.jsonCompiler = new JSONApplicationCompiler();
    this.angularCompiler = new AngularApplicationCompiler();

    this.workspace = workspace;
  }

  addPage() {
    this.workspace.application.addPage();
  }

  removePage(pageId: string) {
    this. workspace.application.removePage(pageId);

    ComponentService.unselectCurrentComponent();
    if (this.activePageIndex >= this.workspace.application.pages.length) {
      this.activePageIndex = this.workspace.application.pages.length - 1;
    }
  }

  goToPage(pageIndex: number) {
    if (pageIndex !== this.activePageIndex) {
      ComponentService.unselectCurrentComponent();
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
    this.angularCompiler.compile(this.workspace.application).then(
      (application) => {
        window['application'] = application;
        window.open('ng2-compiler/index.html?ts=' + Date.now());
      }
    );
  }

  toStaticHTML() {
    this.angularCompiler.compile(this.workspace.application).then(
      (application) => {
        window['application'] = application;

        let activePage = this.getActivePage();
        let applicationName = this.workspace.application.name;

        let iframe = document.createElement('iframe');
        iframe.hidden = true;
        iframe.src = `ng2-compiler/?ts=${Date.now()}#/page/${activePage.id}`;

        iframe.addEventListener('load', function onLoad() {
          this.removeEventListener('load', onLoad);

          let pageNode = this.contentDocument.body.querySelector('page');

          window.open(
            'data:text/html;charset=UTF-8,' + encodeURIComponent(`
              <!DOCTYPE html>
               <html lang="en">
                 <head>
                   <meta charset="utf-8" />
                   <title>${applicationName}</title>
                   <style type="text/css">${application.css}</style>
                 </head>
                 <body>${pageNode.innerHTML}</body>
               </html>
            `)
          );

          this.remove();
          iframe = null;
        });

        document.body.appendChild(iframe);
      }
    );
  }

  startFromScratch() {
    ComponentService.unselectCurrentComponent();

    this.activePageIndex = 0;

    WorkspaceService.reset().then((workspace: Workspace) => {
      this.workspace = workspace;
    });
  }
}

export default VarginWorkspace;
