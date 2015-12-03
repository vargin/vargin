import {
  DOMStaticControlCompiler
} from '../../dom-static/control-compilers/dom-static-control-compiler';
import { Control } from '../../../../core/controls/control';

export class DOMAngularControlCompiler<TControl extends Control> extends DOMStaticControlCompiler<TControl> {
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

  protected bindValue(control: Control, propertyName: string): string {
    let rawValue = control.getProperty(propertyName).getValue();

    if (rawValue.startsWith('bind:')) {
      return `{{ item.get('${rawValue.split(':')[1]}') }}`;
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
