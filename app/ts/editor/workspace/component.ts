/// <reference path="../../../../typings/tsd.d.ts" />
import { Component, View } from 'angular2/angular2';
import ContainerComponent from 'core/components/visual/container-component';
import { Workspace, WorkspaceService } from 'services/workspace-service';

@Component({
  selector: 'vargin-workspace'
})
@View({
  template: `
    <header class="workspace-toolbar">
      <button (click)="serialize()">Serialize</button>
    </header>
    <vargin-container [control]="workspace.root"></vargin-container>
  `,
  directives: [ContainerComponent]
})
class VarginWorkspace {
  private workspace: Workspace;

  constructor() {
    WorkspaceService.load().then((workspace) => this.workspace = workspace);
  }

  serialize() {
    console.log(
      'Serialized control: %s',
      JSON.stringify(this.workspace.root.serialize())
    );
  }
}

export default VarginWorkspace;