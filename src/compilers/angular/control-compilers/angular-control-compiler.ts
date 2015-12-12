import { Control } from '../../../core/controls/control';
import { IControlCompiler } from '../../control-compiler';

// Subset of tags from http://www.w3.org/TR/html51/syntax.html#void-elements
const HTML_VOID_TAGS = new Set<string>(['br', 'hr', 'img', 'input', 'link']);

export class AngularControlCompiler<TControl extends Control> implements IControlCompiler<string> {
  compile(control: TControl): Promise<string> {
    return Promise.resolve(this.getMarkup(control));
  }

  decompile(): Promise<TControl> {
    return null;
  }

  getEventHandlers(control: Control): Array<[string, string]> {
    let eventHandlers: Array<[string, string]> = [];

    control.meta.events.forEach((property, eventKey) => {
      let actions = control.getEvent(eventKey).getValue();
      if (actions && actions.length) {
        eventHandlers.push([
          `(${eventKey})`, `onControlAction(\'${control.id}\', \'${eventKey}\')`
        ]);
      }
    });

    return eventHandlers;
  }

  protected getMarkup(control: TControl) {
    return '';
  }

  protected buildHTMLElement(
    tagName: string, content: string = '', attributes?: Map<string, string>
  ) {
    let attributesString = '';
    if (attributes && attributes.size) {
      attributes.forEach((value, key) => {
        attributesString += ` ${key}="${value}"`;
      });
    }

    return HTML_VOID_TAGS.has(tagName) ?
      `<${tagName}${attributesString} />` :
      `<${tagName}${attributesString}>${content}</${tagName}>`;
  }

  protected bindValue(control: Control, propertyName: string): string {
    let rawValue = control.getProperty(propertyName).getValue();

    if (rawValue.startsWith('bind:')) {
      return `{{ item?.get('${rawValue.split(':')[1]}') }}`;
    }

    return `{{ getControl(\'${control.id}\').getProperty(\'${propertyName}\').getValue() }}`;
  }

  protected bindCSSClass(control: Control): string {
    let rootOverrides = control.overrides.getRoot();
    let cssClass = '';

    if (rootOverrides.name === '__predefined__') {
      cssClass += `vargin-${control.meta.type} `;
    }

    return cssClass + `{{ generateCssClasses(\'${control.id}\') }}`;
  }
}
