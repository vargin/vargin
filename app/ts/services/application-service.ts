import { Application } from 'core/application';
import { UtilsService } from 'services/utils-service';
import { JSONApplicationCompiler } from 'compilers/json/json-application-compiler';

const BUTTON_ID = UtilsService.uuid();

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
          properties: [['text', '[Root] Label1 (click on me)']],
          styles: [
            ['color', '#0000ff'], ['text-decoration', 'line-through']
          ],
          events: [
            ['click', [{
              type: 'change-property-action',
              properties: [
                ['control-id', BUTTON_ID],
                ['property-name', 'text'],
                ['property-value', 'Victory!!!!']
              ]
            }]]
          ]
        }
      }, {
        id: BUTTON_ID,
        type: 'button',
        parameters: {
          styles: [['border', '3px dashed blue']],
          events: [
            ['click', [{
              type: 'broadcast-action',
              properties: [
                ['channel', '(Default)'],
                ['message-name', 'broadcast'],
                ['message-data', 'Hello World']
              ]
            }]]
          ]
        }
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
          }, {
            type: 'text-input',
            parameters: {
              properties: [['placeholder', 'Enter text...']],
              styles: [['color', '#dddddd']]
            }
          }]
        }]
      }]
    }
  }]
};

const MESSAGES_SERIALIZED_APPLICATION = {
  id: '4013f806-000b-4a91-b2ca-2f19c9138734',
  name: 'Messages App',
  description: 'Messages App Description',
  pages: [{
    id: '7544cda3-62a4-49f6-9a7f-a7b7370823e3',
    name: '(Default Page)',
    root: {
      id: 'bc5bcb33-f72b-440a-b72a-6596caed8b2e',
      type: 'container',
      children:[{
        id: '732cfe61-346e-4666-b918-eb3581dfe95b',
        type: 'container',
        children: [{
          id: '2688dc02-9682-433f-aec5-06c6dcf37d63',
          type: 'button',
          parameters: {
            properties: [
              ['text', '<'],
              ['title', 'Go back'],
              ['type', 'button']
            ],
            styles: [
              ['color', '#ffffff'],
              ['background-color', '#27c8c2']
            ]
          }
        }, {
          id: '939d4260-dec6-487c-af3d-cfe18f83dfe8',
          type: 'label',
          parameters: {
            properties: [
              ['text', 'New Message'],
              ['title', '']
            ],
            styles: [
              ['color', '#ffffff'],
              ['background-color', '#27c8c2']
            ]
          }
        }, {
          id: 'e8655539-b9a4-42f4-879a-a915496b899a',
          type: 'button',
          parameters: {
            properties: [
              ['text', '...'],
              ['title', 'Show Options'],
              ['type', 'button']
            ],
            styles: [
              ['color', '#ffffff'],
              ['background-color', '#27c8c2']
            ]
          }
        }],
        parameters: {
          styles: [
            ['background-color', '#27c8c2'],
            ['border', 'none'],
            ['display', 'flex'],
            ['justify-content', 'space-between'],
            ['min-height', '2rem'],
            ['min-width', '5rem']
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
              ['background-color', '#f2f2f2']
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
              ['flex-grow', '1']
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
              ['background-color', '#ffffff']
            ]
          }
        }],
        parameters: {
          styles: [
            ['background-color', '#f2f2f2'],
            ['border', 'none'],
            ['display', 'flex'],
            ['justify-content', 'space-between'],
            ['min-height', '2rem'],
            ['min-width', '5rem']
          ]
        }
      }, {
        id: 'ea852827-5ca9-49fd-8b7b-c59e93bad795',
        type: 'container',
        parameters: {
          styles: [
            ['background-color', '#e1f0ec'],
            ['border', 'none'],
            ['display', 'block'],
            ['min-height', '3rem'],
            ['min-width', '5rem']
          ]
        }
      }, {
        id: 'c69f0b0c-c7d0-4ff9-927f-358677a224e6',
        type: 'container',
        children: [{
          id: '96132230-2b08-4159-a4f5-a3d2b86e2e19',
          type: 'button',
          parameters: {
            properties: [
              ['text', 'Attach'],
              ['title', 'Add attachment'],
              ['type', 'button']
            ],
            styles: [
              ['background-color', '#333333']
            ]
          }
        }, {
          id: '8c1f13a5-3088-407f-b1f7-723ae1143154',
          type: 'text-input',
          parameters: {
            properties: [
              ['placeholder', 'Enter message...'],
              ['value', '']
            ],
            styles: [
              ['flex-grow', '1']
            ]
          }
        }, {
          id: 'f5896530-2ed4-4fd7-a533-40236df217b3',
          type: 'button',
          parameters: {
            properties: [
              ['text', 'Send'],
              ['title', 'Send message'],
              ['type', 'submit']
            ],
            styles: [
              ['background-color', '#333333']
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
          ['border', '3px solid #ddd'],
          ['display', 'block'],
          ['flex-direction', 'column'],
          ['min-height', '10rem'],
          ['min-width', '5rem']
        ]
      }
    }
  }]
};

export class ApplicationService {
  private static _currentApplication: Application;

  static get current() {
    return ApplicationService._currentApplication;
  }

  static set current(value) {
    ApplicationService._currentApplication = value;
  }

  static findControlById(controlId: string) {
    for (var page of ApplicationService.current.pages) {
      var control = page.root.find(controlId);
      if (control) {
        return control;
      }
    }

    return null;
  }
}

// Create default application. TESTING ONLY!
ApplicationService.current = (new JSONApplicationCompiler()).decompile(
  JSON.stringify(MESSAGES_SERIALIZED_APPLICATION)
);

