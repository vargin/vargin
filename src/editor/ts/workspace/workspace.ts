import { Component, NgFor, NgIf, View } from 'angular2/angular2';
import { Application } from '../../../core/application';
import { Control } from '../../../core/controls/control';
import { ContainerComponent } from '../control-components/visual/container-component';
import { ServiceContainerComponent } from '../control-components/service/service-container-component';
import { ApplicationService } from '../../../core/services/application-service';
import { Workspace, WorkspaceService } from '../services/workspace-service';
import { ComponentService } from '../services/component-service';
import {
  JSONApplicationCompiler
} from '../../../compilers/json/json-application-compiler';
import {
  DOMStaticApplicationCompiler
} from '../../../compilers/dom/dom-static/dom-static-application-compiler';
import {
  DOMAngularApplicationCompiler
} from '../../../compilers/dom/dom-angular/dom-angular-application-compiler';

const DEFAULT_SERIALIZED_APPLICATION = {
  id: '4013f806-000b-4a91-b2ca-2f19c9138734',
  name: 'Messages App',
  description: 'Messages App Description',
  serviceRoot: {
    id: 'bc5bcb33-f73b-440a-b72a-6596caed8b2e',
    type: 'container',
    children: [{
      id: '2688dc02-9682-433f-aec5-06c6dcf67d63',
      type: 'datasource',
      overrides: {
        root: {
          id: '__default__',
          name: 'default',
          groups: [
            ['properties', [
              ['name', 'Messages DB'],
              ['schema', `[
                {"name": "Id", "type": 1},
                {"name": "Sender", "type": 0},
                {"name": "Body", "type": 0},
                {"name": "Timestamp", "type": 2},
                {"name": "HasUnread", "type": 4}
              ]`],
              ['items', `[
              [
                ["Id", 1],
                ["Sender", "BIG-THREAD-MIXED"],
                ["Body", "Hey Big Thread"],
                ["Timestamp", ${Date.UTC(2015, 1, 10, 10, 20)}],
                ["HasUnread", false]
              ], [
                ["Id", 2],
                ["Sender", "BIG-THREAD-SMS"],
                ["Body", "message sms message"],
                ["Timestamp", ${Date.UTC(2015, 1, 10, 10, 15)}],
                ["HasUnread", false]
              ], [
                ["Id", 3],
                ["Sender", "+123456789"],
                ["Body", "message from unknown"],
                ["Timestamp", ${Date.UTC(2015, 1, 5, 14, 17)}],
                ["HasUnread", false]
              ], [
                ["Id", 4],
                ["Sender", "+987654321"],
                ["Body", "your balance is xxx"],
                ["Timestamp", ${Date.UTC(2015, 1, 3, 17, 18)}],
                ["HasUnread", true]
              ], [
                ["Id", 5],
                ["Sender", "+978563412"],
                ["Body", "call me back"],
                ["Timestamp", ${Date.UTC(2015, 1, 3, 15, 20)}],
                ["HasUnread", false]
              ], [
                ["Id", 6],
                ["Sender", "Friend"],
                ["Body", "How are you?"],
                ["Timestamp", ${Date.UTC(2015, 1, 2, 10, 10)}],
                ["HasUnread", true]
              ], [
                ["Id", 7],
                ["Sender", "Operator"],
                ["Body", "New service is added!"],
                ["Timestamp", ${Date.UTC(2015, 1, 2, 5, 30)}],
                ["HasUnread", false]
              ], [
                ["Id", 8],
                ["Sender", "Bina Laikova"],
                ["Body", "Are you sure?"],
                ["Timestamp", ${Date.UTC(2015, 1, 1, 20, 45)}],
                ["HasUnread", false]
              ], [
                ["Id", 9],
                ["Sender", "Zona Lamber"],
                ["Body", "....waiting.... for you!"],
                ["Timestamp", ${Date.UTC(2015, 1, 1, 19, 5)}],
                ["HasUnread", true]
              ], [
                ["Id", 10],
                ["Sender", "+101010101"],
                ["Body", "Welcome in ONetwork"],
                ["Timestamp", ${Date.UTC(2015, 1, 1, 10, 10)}],
                ["HasUnread", false]
              ]
            ]`]
            ]]
          ]
        }
      }
    }]
  },
  pages: [{
    id: '29280d16-6d39-42fb-9a0e-b51a49cb266a',
    name: 'Inbox',
    root: {
      id: '29280d16-6d39-42fb-9a0e-b51a49cb266b',
      type: 'container',
      overrides: {
        root: {
          id: '__default__',
          name: 'default',
          groups: [
            ['styles', [
              ['background-color', '#ffffff'],
              ['display', 'flex'],
              ['flex-direction', 'column'],
              ['min-height', '30rem']
            ]]
          ]
        }
      },
      children: [{
        id: '832cfe61-346e-4666-b918-eb3581dfe95b',
        type: 'container',
        overrides: {
          root: {
            id: '__default__',
            name: 'default',
            groups: [
              ['styles', [
                ['color', '#ffffff'],
                ['background-color', '#27c8c2'],
                ['border', 'none'],
                ['display', 'flex'],
                ['font-size', '1.5rem'],
                ['justify-content', 'space-between'],
                ['min-height', '0'],
                ['padding', '0.4rem 0.3rem']
              ]]
            ]
          }
        },
        children: [{
          id: '949d4260-dec6-487c-af3d-cfe18f83dfe8',
          type: 'label',
          overrides: {
            root: {
              id: '__default__',
              name: 'default',
              groups: [
                ['properties', [
                  ['text', 'Messages'],
                  ['title', '']
                ]],
                ['styles', [
                  ['display', 'flex'],
                  ['flex-grow', '1'],
                  ['justify-content', 'center']
                ]]
              ]
            }
          }
        }, {
          id: '3688dc02-9682-433f-aec5-06c6dcf37d63',
          type: 'link',
          overrides: {
            root: {
              id: '__default__',
              name: 'default',
              groups: [
                ['properties', [
                  ['address', '1:7544cda3-62a4-49f6-9a7f-a7b7370823e3'],
                  ['text', '\uD83D\uDD89'],
                  ['title', 'New Message'],
                  ['target', '_self']
                ]],
                ['styles', [
                  ['color', '#ffffff'],
                  ['font-weight', 'bold'],
                  ['padding', '0 1rem'],
                  ['text-decoration', 'none']
                ]]
              ]
            }
          }
        }, {
          id: 'f8655539-b9a4-42f4-879a-a915496b899a',
          type: 'button',
          overrides: {
            root: {
              id: '__default__',
              name: 'default',
              groups: [
                ['properties', [
                  ['text', '…'],
                  ['title', 'Show Options'],
                  ['type', 'button']
                ]],
                ['styles', [
                  ['font-weight', 'bold']
                ]],
                ['events', [
                  ['click', `[{
                    "type": "alert-action",
                    "overrides": {
                      "root": {
                        "id": "f8655539-b9a5-24f4-879a-a915496b899a",
                        "name": "default",
                        "groups": [[
                          "properties",
                          [["alert-message", "Show options (not implemented)"]]
                        ]]
                      }
                    }
                  }]`]
                ]]
              ]
            }
          }
        }]
      }, {
        id: 'fa852827-5ca9-49fd-8b7b-c59e93bad795',
        type: 'container',
        overrides: {
          root: {
            id: '__default__',
            name: 'default',
            groups: [
              ['styles', [
                ['border', 'none'],
                ['display', 'flex'],
                ['flex-grow', '1'],
                ['justify-content', 'center']
              ]]
            ]
          }
        },
        children: [{
          id: 'fa852827-5ca9-49fd-8b7b-c59e93bad895',
          type: 'list',
          overrides: {
            root: {
              id: '__default__',
              name: 'default',
              groups: [
                ['properties', [
                  ['datasource', '2688dc02-9682-433f-aec5-06c6dcf67d63']
                ]],
                ['styles', [
                  ['flex-grow', '1'],
                  ['min-width', '10rem']
                ]]
              ]
            }
          },
          children: [{
            id: '3788dc02-9682-433f-aec5-06c6dcf67d63',
            type: 'list-item',
            overrides: {
              root: {
                id: '__default__',
                name: 'default',
                groups: [
                  ['styles', [
                    ['display', 'flex'],
                    ['margin', '0 0 0.5rem'],
                    ['min-height', 'auto'],
                    ['padding', '0.5rem 0']
                  ]]
                ]
              }
            },
            children: [{
              id: '4788dc02-9782-443f-aec5-06c6dcf67d63',
              type: 'container',
              overrides: {
                root: {
                  id: '__default__',
                  name: 'default',
                  groups: [
                    ['styles', [
                      ['align-items', 'center'],
                      ['display', 'flex'],
                      ['justify-content', 'center'],
                      ['min-height', 'auto'],
                      ['min-width', '1rem']
                    ]]
                  ]
                }
              },
              children: [{
                id: '4788dc02-9883-453f-aec5-07c7dcf67d63',
                type: 'label',
                overrides: {
                  root: {
                    id: '__default__',
                    name: 'default',
                    groups: [
                      ['properties', [
                        ['text', '\u25CF']
                      ]],
                      ['styles', [
                        ['color', '#52B6CC'],
                        ['font-size', '0.5rem'],
                        ['margin', '0 0.5rem 0 0']
                      ]]
                    ]
                  }
                }
              }]
            }, {
              id: '4788dc02-9782-453f-aec5-06c6dcf67d63',
              type: 'container',
              overrides: {
                root: {
                  id: '__default__',
                  name: 'default',
                  groups: [
                    ['styles', [
                      ['flex-grow', '1'],
                      ['min-height', 'auto'],
                      ['min-width', '2rem']
                    ]]
                  ]
                }
              },
              children: [{
                id: '4788dc02-9782-453f-aec5-07c7dcf67d63',
                type: 'label',
                overrides: {
                  root: {
                    id: '__default__',
                    name: 'default',
                    groups: [
                      ['properties', [
                        ['text', 'bind:Sender']
                      ]],
                      ['styles', [
                        ['display', 'block'],
                        ['margin', '0 0 0.5rem']
                      ]]
                    ]
                  }
                }
              }, {
                id: '5788dc06-9782-453f-aec5-07c7dcf67d63',
                type: 'container',
                overrides: {
                  root: {
                    id: '__default__',
                    name: 'default',
                    groups: [
                      ['styles', [
                        ['color', '#868686'],
                        ['min-height', 'auto']
                      ]]
                    ]
                  }
                },
                children: [{
                  id: '4788dc05-9791-453a-aec5-07c7dcf67d63',
                  type: 'label',
                  overrides: {
                    root: {
                      id: '__default__',
                      name: 'default',
                      groups: [
                        ['properties', [
                          ['text', 'bind:Timestamp'],
                          ['format', '4']
                        ]],
                        ['styles', [
                          ['margin', '0 0.5rem 0 0'],
                          ['min-height', 'auto']
                        ]]
                      ]
                    }
                  }
                }, {
                  id: '4788dc15-9795-453a-aec5-07c7dcf67d63',
                  type: 'label',
                  overrides: {
                    root: {
                      id: '__default__',
                      name: 'default',
                      groups: [
                        ['properties', [
                          ['text', 'bind:Body']
                        ]]
                      ]
                    }
                  }
                }]
              }]
            }]
          }]
        }]
      }]
    }
  }, {
    id: '7544cda3-62a4-49f6-9a7f-a7b7370823e3',
    name: 'New Message',
    root: {
      id: 'bc5bcb33-f72b-440a-b72a-6596caed8b2e',
      type: 'container',
      overrides: {
        root: {
          id: '__default__',
          name: 'default',
          groups: [
            ['styles', [
              ['background-color', '#ffffff'],
              ['display', 'flex'],
              ['flex-direction', 'column'],
              ['min-height', '30rem']
            ]]
          ]
        }
      },
      children: [{
        id: '732cfe61-346e-4666-b918-eb3581dfe95b',
        type: 'container',
        overrides: {
          root: {
            id: '__default__',
            name: 'default',
            groups: [
              ['styles', [
                ['color', '#ffffff'],
                ['background-color', '#27c8c2'],
                ['border', 'none'],
                ['display', 'flex'],
                ['font-size', '1.5rem'],
                ['justify-content', 'space-between'],
                ['min-height', '0'],
                ['padding', '0.4rem 0.3rem']
              ]
              ]]
          }
        },
        children: [{
          id: '2688dc02-9682-433f-aec5-06c6dcf37d63',
          type: 'link',
          overrides: {
            root: {
              id: '__default__',
              name: 'default',
              groups: [
                ['properties', [
                  ['address', '1:29280d16-6d39-42fb-9a0e-b51a49cb266a'],
                  ['text', '\u3008'],
                  ['title', 'Go to Inbox'],
                  ['target', '_self']
                ]],
                ['styles', [
                  ['color', '#ffffff'],
                  ['font-weight', 'bold'],
                  ['text-decoration', 'none']
                ]]
              ]
            }
          }
        }, {
          id: '939d4260-dec6-487c-af3d-cfe18f83dfe8',
          type: 'label',
          overrides: {
            root: {
              id: '__default__',
              name: 'default',
              groups: [
                ['properties', [
                  ['text', 'New Message'],
                  ['title', '']
                ]]
              ]
            }
          }
        }, {
          id: 'e8655539-b9a4-42f4-879a-a915496b899a',
          type: 'button',
          overrides: {
            root: {
              id: '__default__',
              name: 'default',
              groups: [
                ['properties', [
                  ['text', '…'],
                  ['title', 'Show Options'],
                  ['type', 'button']
                ]],
                ['styles', [
                  ['font-weight', 'bold']
                ]],
                ['events', [
                  ['click', `[{
                    "type": "alert-action",
                    "overrides": {
                      "root": {
                        "id": "f8655539-b9a5-24f5-978a-a915496b899a",
                        "name": "default",
                        "groups": [[
                          "properties",
                          [["alert-message", "Show options (not implemented)"]]
                        ]]
                      }
                    }
                  }]`]
                ]]
              ]
            }
          }
        }]
      }, {
        id: '764d7257-de9c-4ced-ae34-b2e8d47b1768',
        type: 'container',
        overrides: {
          root: {
            id: '__default__',
            name: 'default',
            groups: [
              ['styles', [
                ['align-items', 'center'],
                ['background-color', '#f2f2f2'],
                ['border', 'none'],
                ['display', 'flex'],
                ['min-height', '0'],
                ['padding', '0.2rem 0.3rem']
              ]]
            ]
          }
        },
        children: [{
          id: '033f8633-a495-4d48-8bd9-69721031499a',
          type: 'label',
          overrides: {
            root: {
              id: '__default__',
              name: 'default',
              groups: [
                ['properties', [
                  ['text', 'To:'],
                  ['title', '']
                ]],
                ['styles', [
                  ['padding', '0 0.4rem 0 0.2rem']
                ]]
              ]
            }
          }
        }, {
          id: '387f4b5a-d879-4ff3-9cc6-e6048fb7347b',
          'type': 'text-input',
          overrides: {
            root: {
              id: '__default__',
              name: 'default',
              groups: [
                ['properties', [
                  ['placeholder', 'Type contact name or number...'],
                  ['value', '']
                ]],
                ['styles', [
                  ['flex-grow', '1'],
                  ['border', 'none']
                ]]
              ]
            }
          }
        }, {
          id: 'cc5478d7-6c26-4ca9-9381-336a40446426',
          type: 'button',
          overrides: {
            root: {
              id: '__default__',
              name: 'default',
              groups: [
                ['properties', [
                  ['text', '+'],
                  ['title', 'Add contact'],
                  ['type', 'button']
                ]],
                ['styles', [
                  ['background-color', '#ffffff'],
                  ['border', '0.1rem solid transparent'],
                  ['border-radius', '3rem'],
                  ['font-size', '0.8rem'],
                  ['height', '1.5rem'],
                  ['padding', '0 0.25rem']
                ]]
              ]
            }
          }
        }]
      }, {
        id: 'ea852827-5ca9-49fd-8b7b-c59e93bad795',
        type: 'container',
        overrides: {
          root: {
            id: '__default__',
            name: 'default',
            groups: [
              ['styles', [
                ['background-color', '#e1f0ec'],
                ['border', 'none'],
                ['display', 'flex'],
                ['flex-grow', '1'],
                ['justify-content', 'center']
              ]]
            ]
          }
        },
        children: [{
          id: '1d6e60c0-7ee7-4d4f-b666-3086d0885617',
          type: 'label',
          overrides: {
            root: {
              id: '__default__',
              name: 'default',
              groups: [
                ['properties', [
                  ['text', '[Message Status]'],
                  ['title', '']
                ]],
                ['styles', [
                  ['font-size', '2rem'],
                  ['display', 'flex']
                ]]
              ]
            }
          }
        }],
      }, {
        id: 'c69f0b0c-c7d0-4ff9-927f-358677a224e6',
        type: 'container',
        overrides: {
          root: {
            id: '__default__',
            name: 'default',
            groups: [
              ['styles', [
                ['display', 'flex'],
                ['border', 'none'],
                ['justify-content', 'space-between'],
                ['min-height', '2rem'],
                ['min-width', '5rem']
              ]]
            ]
          }
        },
        children: [{
          id: '96132230-2b08-4159-a4f5-a3d2b86e2e19',
          type: 'button',
          overrides: {
            root: {
              id: '__default__',
              name: 'default',
              groups: [
                ['properties', [
                  ['text', ''],
                  ['title', 'Add attachment'],
                  ['type', 'button']
                ]],
                ['styles', [
                  ['background-image', 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAByElEQVR4Ae3XvUvUcRzA8V8JF4ggWXmYdCWFlUMPhg0lWA3hVlMt4dhW/0BEgVtDQVBBUENNBRJu0lCLNPRAmWFhaRZldXXyO1JROb1eg0Pc8IV7sCAbXtvny3u63+dzUT6f/yuWcTjq6flT/p3wAe6RIccol2hcqvAKLrDAK7o5zTViMnRUOlzFdfKcYyXRb+p5TEyqUuEqbrPAqcBckixXKxFOcJd5ThKFcJOxcsOr6CVHF1EQnGemnHA1fcxxLDC3gRNEi24xUmq4hofMciQw18Qo46wmxRQXSwnX0s80nYG5Zj7yia2s5SVpksWG63jKJAcDcy184T1NJBkkZm+xv+N6XhDTHojuJs0wKRp5ww9ai/1yNTDEBG2BaBsTDNHAJkb4yo5iv9Up3pJmVyDaTpbn1LOFD3xmW7FLYh2jjNMSiB5ikifUsZ1xxthcyna6QUxz4HEn0/RTy06+8Y6Npa7F71wOPDzKLA+oYQ8ZXrO+nH08RTcRhY4zRx/V7CNmgGS5h8B9hqkueNBFjl4SdPCTZ6ypxAXSygyDdHGYK8xzhwQRZ3hEbSVPn/0MkF+U5SxVhetxqW6uRlpI/L8yy7BM/8L8AiXgms8p1f8rAAAAAElFTkSuQmCC)'],
                  ['background-repeat', 'no-repeat'],
                  ['padding', '1rem']
                ]]
              ]
            }
          }
        }, {
          id: '8c1f13a5-3088-407f-b1f7-723ae1143154',
          type: 'text-input',
          overrides: {
            root: {
              id: '__default__',
              name: 'default',
              groups: [
                ['properties', [
                  ['placeholder', 'Type message...'],
                  ['value', '']
                ]],
                ['styles', [
                  ['border', 'none'],
                  ['flex-grow', '1']
                ]]
              ]
            }
          }
        }, {
          id: 'f5896530-2ed4-4fd7-a533-40236df217b3',
          type: 'button',
          overrides: {
            root: {
              id: '__default__',
              name: 'default',
              groups: [
                ['properties', [
                  ['text', ''],
                  ['title', 'Send message'],
                  ['type', 'submit']
                ]],
                ['styles', [
                  ['background-image', 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAA60lEQVR42u3VPQtBURjAcbqU1SJWJTtfgGKSwcJm8hW8ZL3KJ8CK/Q7KXSzyGQwmi2RgtSCO/2CQxHVfjuU89Zv/ne655/GpUSN3DGOEMgKywy0IbNBAWFY4igvEwxE9JGXEJxAvrjCRg9+rcBHigyVqCLkdDmAH8cUeOqJuxrsQFp0wRsqNcAI3iB8tUILmJD6HsGmNjJO4hjiyqKKNAaZYfYmbdqMz+SfmlNK/8SPcsXGr005vtIatheABOmJu/cOFf71cxpvYDSby8HvxTkdwftlOfc+3E4H60z5uytzHQ1QQ9KlRo8bi3AEJOr0MDjN9yQAAAABJRU5ErkJggg==)'],
                  ['background-repeat', 'no-repeat'],
                  ['padding', '1rem']
                ]],
                ['events', [
                  ['click', `[{
                    "type": "change-property-action",
                    "overrides": {
                      "root": {
                        "id": "f8666639-b9a5-24f4-879a-a915496b899a",
                        "name": "default",
                        "groups": [[
                          "properties",
                          [
                            ["control-id", "1d6e60c0-7ee7-4d4f-b666-3086d0885617"],
                            ["property-name", "text"],
                            ["property-value", "[Message Sent!]"]
                          ]
                        ]]
                      }
                    }
                  }]`]
                ]]
              ]
            }
          }
        }]
      }]
    }
  }]
};

const EMPTY_SERIALIZED_APPLICATION = {
  id: '4013f806-000b-4a91-b2ca-2f19c9138734',
  name: '(Empty App)',
  description: 'Empty App Description',
  serviceRoot: {
    id: 'bc5bcb33-f73b-440a-b72a-6596caed8b2e',
    type: 'container'
  },
  pages: [{
    id: '7544cda3-62a4-49f6-9a7f-a7b7370823e3',
    name: '(Default Page)',
    root: {
      id: 'bc5bcb33-f72b-440a-b72a-6596caed8b2e',
      type: 'container'
    }
  }]
};

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

    // Create default application. TESTING ONLY!
    this.jsonCompiler.decompile(
      JSON.stringify(DEFAULT_SERIALIZED_APPLICATION)
    ).then(
      (application) => this.setCurrentApplication(application)
    );
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
        'data:text/html;charset=UTF-8,' + encodeURIComponent(compiledApplication)
       );
     }
    );
  }

  startFromScratch() {
    ComponentService.unselectCurrentComponent();

    this.activePageIndex = 0;

    this.jsonCompiler.decompile(
      JSON.stringify(EMPTY_SERIALIZED_APPLICATION)
    ).then(
      (application) => this.setCurrentApplication(application)
    );
  }

  private setCurrentApplication(application: Application) {
    ApplicationService.current = application;
    this.workspace = WorkspaceService.create(ApplicationService.current);
  }
}

export default VarginWorkspace;
