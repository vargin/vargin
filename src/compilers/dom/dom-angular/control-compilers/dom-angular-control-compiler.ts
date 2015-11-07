import { DOMStaticControlCompiler } from 'compilers/dom/dom-static/control-compilers/dom-static-control-compiler';
import { Control } from 'core/controls/control';

export class DOMAngularControlCompiler<TControl extends Control> extends DOMStaticControlCompiler<TControl> {

  getEventHandlers(control: Control): Array<[string, string]> {
    let eventHandlers: Array<[string, string]> = [];

    control.events.forEach((actions, eventKey) => {
      if (actions.getValue().length) {
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
}
