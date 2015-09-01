import { DOMStaticControlCompiler } from 'compilers/dom/dom-static/control-compilers/dom-static-control-compiler';
import { Control } from 'core/controls/control';

export class DOMAngularControlCompiler<TControl extends Control>
       extends DOMStaticControlCompiler<TControl> {

  protected getEventHandlers(control: Control): Iterable<[string, string]> {
    var eventHandlers = [];

    control.events.forEach((actions, eventKey) => {
      if (actions.getValue().length) {
        eventHandlers.push([
          `(${eventKey})`, `onControlAction(\'${control.id}\', \'${eventKey}\')`
        ]);
      }
    });

    return eventHandlers;
  }

  protected static getDynamicPropertyValue(control, propertyName) {
    return `{{getControl(\'${control.id}\').${propertyName}.getValue()}}`;
  }
}