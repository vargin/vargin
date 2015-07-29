import { ContainerControl } from 'core/controls/visual/container-control';

import { ControlService } from 'services/control-service';
import { UtilsService } from 'services/utils-service';

const DEFAULT_SERIALIZED_ROOT = {
  type: 'container',
  parameters: {
    children: [{
      type: 'label',
      parameters: {
        properties: [['text', '[Nested-1] Label1']],
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
      parameters: {
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
          parameters: {
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
          }
        }]
      }
    }]
  }
};

export class Workspace {
  private _id: string;
  private _name: string;
  private _root: ContainerControl;

  constructor(id: string, name: string, root: ContainerControl) {
    this._id = id;
    this._name = name;
    this._root = root;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get root() {
    return this._root;
  }
}

export class WorkspaceService {
  static load(): Promise<Workspace> {
    return Promise.resolve(
      new Workspace(
        UtilsService.uuid(),
        '(Default)',
        ControlService.deserialize<ContainerControl>(DEFAULT_SERIALIZED_ROOT)
      )
    );
  }
}