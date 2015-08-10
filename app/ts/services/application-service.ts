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
          }]
        }]
      }]
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
  JSON.stringify(DEFAULT_SERIALIZED_APPLICATION)
);

