import { Application } from 'core/application';
import { UtilsService } from 'services/utils-service';
import { JsonApplicationCompiler } from 'compilers/json/json-application-compiler';

const MINIMAL_SERIALIZED_APPLICATION = {
  id: UtilsService.uuid(),
  name: '(Minimal App)',
  description: '(Minimal App)',
  pages: [{
    id: UtilsService.uuid(),
    name: '(Default Page)',
    root: {
      type: 'container',
      children: [{
        type: 'label',
        parameters: { properties: [['text', '[Root] Label1']] }
      }, {
        type: 'button'
      }]
    }
  }]
};

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

export class ApplicationService {
  private static _currentApplication: Application;

  static get current() {
    return ApplicationService._currentApplication;
  }

  static set current(value) {
    ApplicationService._currentApplication = value;
  }
}

// Create default application. TESTING ONLY!
ApplicationService.current = (new JsonApplicationCompiler()).decompile(
  JSON.stringify(DEFAULT_SERIALIZED_APPLICATION)
);

