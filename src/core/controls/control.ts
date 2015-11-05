import { IProperty } from 'core/property';
import { IAction } from 'core/actions/action';
import {
  OwnedProperty,
  OwnedPropertyWithOptions,
  OwnedPropertyView,
  OwnedPropertyWithOptionsView
} from 'core/owned-property';
import { ControlMetadata } from 'core/controls/control-metadata';
import { ControlState } from 'core/controls/control-state';

export interface IControlParameters {
  events?: Map<string, IAction[]>;
}

export class Control {
  private _id: string;
  private _meta: ControlMetadata;
  private _parent: Control;
  private _children: Control[];
  private _events: Map<string, IProperty<IAction[]>>;
  private _states: ControlState[];
  private _cache: {
    properties: Map<string, OwnedPropertyView<string, Control>>
  };
  private currentStateIndex: number = 0;

  constructor(
    id: string,
    meta: ControlMetadata,
    states?: ControlState[],
    parameters?: IControlParameters
  ) {
    this._id = id;
    this._meta = meta;
    this._parent = null;
    this._children = [];
    this._events = new Map<string, IProperty<IAction[]>>();

    let controlParameters = parameters || <IControlParameters>{};

    if (states && states.length) {
      this._states = states;
    } else {
      this._states = [new ControlState('default')];
    }

    this._cache = {
      properties: new Map<string, OwnedPropertyView<string, Control>>()
    };

    this._meta.supportedEvents.forEach((metaProperty, eventKey) => {
      let controlEventProperty =  new OwnedProperty(this, metaProperty);

      if (controlParameters.events && controlParameters.events.has(eventKey)) {
        controlEventProperty.setValue(controlParameters.events.get(eventKey));
      } else {
        controlEventProperty.setValue([]);
      }

      this._events.set(eventKey, controlEventProperty);
    });
  }

  /**
   * Unique id of the control.
   * @returns {string}
   */
  get id() {
    return this._id;
  }

  /**
   * Metadata that describes type of the control.
   * @returns {ControlMetadata}
   */
  get meta() {
    return this._meta;
  }

  /**
   * States that current control has.
   * @returns {ControlState[]}
   */
  get states() {
    return this._states;
  }

  /**
   * List of event names supported by control.
   * @returns {Map<string, IProperty<IAction[]>>}
   */
  get events() {
    return this._events;
  }

  /**
   * Gets control parent if any.
   * @returns {Control}
   */
  get parent() {
    return this._parent;
  }

  /**
   * Sets parent for the current control.
   * @param {Control} parent Parent control;
   */
  set parent(parent) {
    this._parent = parent;
  }

  /**
   * Finds child control by id, traverses through entire child tree.
   * @param {string} id Id of the control to find.
   * @returns {Control} Found child control.
   */
  find(id: string): Control {
    if (this.id === id) {
      return this;
    }

    for (let control of this._children) {
      let child = control.find(id);
      if (child) {
        return child;
      }
    }

    return null;
  }

  /**
   * Adds child to the children collection.
   * @param {Control} child Control to add as child.
   */
  addChild(child: Control) {
    child.parent = this;

    this._children.push(child);
  }

  /**
   * Removes child control from the children list.
   * @param {Control} control Child control to remove.
   */
  removeChild(control: Control) {
    let childIndex = this._children.indexOf(control);

    if (childIndex >= 0) {
      // Remove control children.
      control.getChildren().forEach((child) => control.removeChild(child));

      control.parent = null;
      this._children.splice(childIndex, 1);
    }
  }

  /**
   * List of controls children if any.
   * @returns {Array.<Control>}
   */
  getChildren() {
    return this._children.slice();
  }

  /**
   * Removes itself from the parent children list.
   */
  remove() {
    if (this._parent) {
      this._parent.removeChild(this);
    }
  }

  protected getProperty(key: string) {
    let property = this._cache.properties.get(key);

    if (!property) {
      let metaProperty = this.meta.supportedProperties.get(key);

      let MetaPropertyType = 'getOptions' in metaProperty ?
        OwnedPropertyWithOptionsView :
        OwnedPropertyView;

      property = new MetaPropertyType(
        this,
        metaProperty,
        key,
        this._states[this.currentStateIndex].overrides.properties
      );

      this._cache.properties.set(key, property);
    }

    return property;
  }

  static getMeta(): ControlMetadata {
    throw new Error('Not Implemented!');
  }
}
