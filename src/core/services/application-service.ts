import { Application } from 'core/application';
import { UtilsService } from 'core/services/utils-service';
import { JSONApplicationCompiler } from 'compilers/json/json-application-compiler';

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
      parameters: {
        properties: [
          ['name', 'Messages DB'],
          ['schema', `[
            {"name": "Id", "type": 1},
            {"name": "Sender", "type": 0},
            {"name": "Timestamp", "type": 2}
          ]`],
          ['items', `[
            [
              ["Id", "1"],
              ["Sender", "+123"],
              ["Timestamp", "1444077904444"]
            ], [
              ["Id","2"],
              ["Sender", "+49176567"],
              ["Timestamp", "1444077927247"]
            ]
          ]`]
        ]
      }
    }]
  },
  pages: [{
    id: '29280d16-6d39-42fb-9a0e-b51a49cb266a',
    name: 'Inbox',
    root: {
      id: '29280d16-6d39-42fb-9a0e-b51a49cb266b',
      type: 'container',
      children: [{
        id: '832cfe61-346e-4666-b918-eb3581dfe95b',
        type: 'container',
        children: [{
          id: '949d4260-dec6-487c-af3d-cfe18f83dfe8',
          type: 'label',
          parameters: {
            properties: [
              ['text', 'Messages'],
              ['title', '']
            ],
            styles: [
              ['display', 'flex'],
              ['flex-grow', '1'],
              ['justify-content', 'center']
            ]
          }
        }, {
          id: '3688dc02-9682-433f-aec5-06c6dcf37d63',
          type: 'link',
          parameters: {
            properties: [
              ['address', '1:7544cda3-62a4-49f6-9a7f-a7b7370823e3'],
              ['text', '\uD83D\uDD89'],
              ['title', 'New Message'],
              ['target', '_self']
            ],
            styles: [
              ['color', '#ffffff'],
              ['font-weight', 'bold'],
              ['padding', '0 1rem'],
              ['text-decoration', 'none']
            ]
          }
        }, {
          id: 'f8655539-b9a4-42f4-879a-a915496b899a',
          type: 'button',
          parameters: {
            properties: [
              ['text', '…'],
              ['title', 'Show Options'],
              ['type', 'button']
            ],
            styles: [
              ['font-weight', 'bold']
            ],
            events: [
              ['click', [{
                type: 'alert-action',
                properties: [['alert-message', 'Show options (not implemented)']]
              }]]
            ]
          }
        }],
        parameters: {
          styles: [
            ['color', '#ffffff'],
            ['background-color', '#27c8c2'],
            ['border', 'none'],
            ['display', 'flex'],
            ['font-size', '1.5rem'],
            ['justify-content', 'space-between'],
            ['min-height', '0'],
            ['padding', '0.4rem 0.3rem']
          ]
        }
      }, {
        id: 'fa852827-5ca9-49fd-8b7b-c59e93bad795',
        type: 'container',
        parameters: {
          styles: [
            ['border', 'none'],
            ['display', 'flex'],
            ['flex-grow', '1'],
            ['justify-content', 'center']
          ]
        }
      }],
      parameters: {
        styles: [
          ['background-color', '#ffffff'],
          ['display', 'flex'],
          ['flex-direction', 'column'],
          ['min-height', '30rem']
        ]
      }
    }
  }, {
    id: '7544cda3-62a4-49f6-9a7f-a7b7370823e3',
    name: 'New Message',
    root: {
      id: 'bc5bcb33-f72b-440a-b72a-6596caed8b2e',
      type: 'container',
      children: [{
        id: '732cfe61-346e-4666-b918-eb3581dfe95b',
        type: 'container',
        children: [{
          id: '2688dc02-9682-433f-aec5-06c6dcf37d63',
          type: 'link',
          parameters: {
            properties: [
              ['address', '1:29280d16-6d39-42fb-9a0e-b51a49cb266a'],
              ['text', '\u3008'],
              ['title', 'Go to Inbox'],
              ['target', '_self']
            ],
            styles: [
              ['color', '#ffffff'],
              ['font-weight', 'bold'],
              ['text-decoration', 'none']
            ]
          }
        }, {
          id: '939d4260-dec6-487c-af3d-cfe18f83dfe8',
          type: 'label',
          parameters: {
            properties: [
              ['text', 'New Message'],
              ['title', '']
            ]
          }
        }, {
          id: 'e8655539-b9a4-42f4-879a-a915496b899a',
          type: 'button',
          parameters: {
            properties: [
              ['text', '…'],
              ['title', 'Show Options'],
              ['type', 'button']
            ],
            styles: [
              ['font-weight', 'bold']
            ],
            events: [
              ['click', [{
                type: 'alert-action',
                properties: [['alert-message', 'Show options (not implemented)']]
              }]]
            ]
          }
        }],
        parameters: {
          styles: [
            ['color', '#ffffff'],
            ['background-color', '#27c8c2'],
            ['border', 'none'],
            ['display', 'flex'],
            ['font-size', '1.5rem'],
            ['justify-content', 'space-between'],
            ['min-height', '0'],
            ['padding', '0.4rem 0.3rem']
          ]
        }
      }, {
        id: '764d7257-de9c-4ced-ae34-b2e8d47b1768',
        type: 'container',
        children: [{
          id: '033f8633-a495-4d48-8bd9-69721031499a',
          type: 'label',
          parameters: {
            properties: [
              ['text', 'To:'],
              ['title', '']
            ],
            styles: [
              ['padding', '0 0.4rem 0 0.2rem']
            ]
          }
        }, {
          id: '387f4b5a-d879-4ff3-9cc6-e6048fb7347b',
          'type': 'text-input',
          parameters: {
            properties: [
              ['placeholder', 'Type contact name or number...'],
              ['value', '']
            ],
            styles: [
              ['flex-grow', '1'],
              ['border', 'none']
            ]
          }
        }, {
          id: 'cc5478d7-6c26-4ca9-9381-336a40446426',
          type: 'button',
          parameters: {
            properties: [
              ['text', '+'],
              ['title', 'Add contact'],
              ['type', 'button']
            ],
            styles: [
              ['background-color', '#ffffff'],
              ['border', '0.1rem solid transparent'],
              ['border-radius', '3rem'],
              ['font-size', '0.8rem'],
              ['height', '1.5rem'],
              ['padding', '0 0.25rem']
            ]
          }
        }],
        parameters: {
          styles: [
            ['align-items', 'center'],
            ['background-color', '#f2f2f2'],
            ['border', 'none'],
            ['display', 'flex'],
            ['min-height', '0'],
            ['padding', '0.2rem 0.3rem']
          ]
        }
      }, {
        id: 'ea852827-5ca9-49fd-8b7b-c59e93bad795',
        type: 'container',
        parameters: {
          styles: [
            ['background-color', '#e1f0ec'],
            ['border', 'none'],
            ['display', 'flex'],
            ['flex-grow', '1'],
            ['justify-content', 'center']
          ]
        },
        children: [{
          id: '1d6e60c0-7ee7-4d4f-b666-3086d0885617',
          type: 'label',
          parameters: {
            properties: [
              ['text', '[Message Status]'],
              ['title', '']
            ],
            styles: [
              ['font-size', '2rem'],
              ['display', 'flex']
            ]
          }
        }],
      }, {
        id: 'c69f0b0c-c7d0-4ff9-927f-358677a224e6',
        type: 'container',
        children: [{
          id: '96132230-2b08-4159-a4f5-a3d2b86e2e19',
          type: 'button',
          parameters: {
            properties: [
              ['text', ''],
              ['title', 'Add attachment'],
              ['type', 'button']
            ],
            styles: [
              ['background-image', 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAByElEQVR4Ae3XvUvUcRzA8V8JF4ggWXmYdCWFlUMPhg0lWA3hVlMt4dhW/0BEgVtDQVBBUENNBRJu0lCLNPRAmWFhaRZldXXyO1JROb1eg0Pc8IV7sCAbXtvny3u63+dzUT6f/yuWcTjq6flT/p3wAe6RIccol2hcqvAKLrDAK7o5zTViMnRUOlzFdfKcYyXRb+p5TEyqUuEqbrPAqcBckixXKxFOcJd5ThKFcJOxcsOr6CVHF1EQnGemnHA1fcxxLDC3gRNEi24xUmq4hofMciQw18Qo46wmxRQXSwnX0s80nYG5Zj7yia2s5SVpksWG63jKJAcDcy184T1NJBkkZm+xv+N6XhDTHojuJs0wKRp5ww9ai/1yNTDEBG2BaBsTDNHAJkb4yo5iv9Up3pJmVyDaTpbn1LOFD3xmW7FLYh2jjNMSiB5ikifUsZ1xxthcyna6QUxz4HEn0/RTy06+8Y6Npa7F71wOPDzKLA+oYQ8ZXrO+nH08RTcRhY4zRx/V7CNmgGS5h8B9hqkueNBFjl4SdPCTZ6ypxAXSygyDdHGYK8xzhwQRZ3hEbSVPn/0MkF+U5SxVhetxqW6uRlpI/L8yy7BM/8L8AiXgms8p1f8rAAAAAElFTkSuQmCC)'],
              ['background-repeat', 'no-repeat'],
              ['padding', '1rem']
            ]
          }
        }, {
          id: '8c1f13a5-3088-407f-b1f7-723ae1143154',
          type: 'text-input',
          parameters: {
            properties: [
              ['placeholder', 'Type message...'],
              ['value', '']
            ],
            styles: [
              ['border', 'none'],
              ['flex-grow', '1']
            ]
          }
        }, {
          id: 'f5896530-2ed4-4fd7-a533-40236df217b3',
          type: 'button',
          parameters: {
            properties: [
              ['text', ''],
              ['title', 'Send message'],
              ['type', 'submit']
            ],
            styles: [
              ['background-image', 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAA60lEQVR42u3VPQtBURjAcbqU1SJWJTtfgGKSwcJm8hW8ZL3KJ8CK/Q7KXSzyGQwmi2RgtSCO/2CQxHVfjuU89Zv/ne655/GpUSN3DGOEMgKywy0IbNBAWFY4igvEwxE9JGXEJxAvrjCRg9+rcBHigyVqCLkdDmAH8cUeOqJuxrsQFp0wRsqNcAI3iB8tUILmJD6HsGmNjJO4hjiyqKKNAaZYfYmbdqMz+SfmlNK/8SPcsXGr005vtIatheABOmJu/cOFf71cxpvYDSby8HvxTkdwftlOfc+3E4H60z5uytzHQ1QQ9KlRo8bi3AEJOr0MDjN9yQAAAABJRU5ErkJggg==)'],
              ['background-repeat', 'no-repeat'],
              ['padding', '1rem']
            ],
            events: [
              ['click', [{
                type: 'change-property-action',
                properties: [
                  ['control-id', '1d6e60c0-7ee7-4d4f-b666-3086d0885617'],
                  ['property-name', 'text'],
                  ['property-value', '[Message Sent!]']
                ]
              }]]
            ]
          }
        }],
        parameters: {
          styles: [
            ['display', 'flex'],
            ['border', 'none'],
            ['justify-content', 'space-between'],
            ['min-height', '2rem'],
            ['min-width', '5rem']
          ]
        }
      }],
      parameters: {
        styles: [
          ['background-color', '#ffffff'],
          ['display', 'flex'],
          ['flex-direction', 'column'],
          ['min-height', '30rem']
        ]
      }
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

export class ApplicationService {
  private static _currentApplication: Application;

  static initialize() {
    // Create default application. TESTING ONLY!
    return (new JSONApplicationCompiler()).decompile(
      JSON.stringify(DEFAULT_SERIALIZED_APPLICATION)
    ).then((decompiledApplication) => {
      ApplicationService.current = decompiledApplication;
    });
  }

  static get current() {
    return ApplicationService._currentApplication;
  }

  static set current(value) {
    ApplicationService._currentApplication = value;
  }

  static reset() {
    return (new JSONApplicationCompiler()).decompile(
      JSON.stringify(EMPTY_SERIALIZED_APPLICATION)
    ).then((decompiledApplication) => {
      ApplicationService.current = decompiledApplication;
    });
  }

  static findControlById(controlId: string) {
    for (var page of ApplicationService.current.pages) {
      let control = page.root.find(controlId);
      if (control) {
        return control;
      }
    }

    return null;
  }
}
