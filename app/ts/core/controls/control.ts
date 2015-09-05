import { IProperty } from 'core/property';
import { IAction } from 'core/actions/action';
import {
  ControlProperty,
  ControlPropertyWithOptions
} from 'core/controls/control-property';
import { ControlMetadata } from 'core/controls/control-metadata';

export interface IControlParameters {
  properties?: Map<string, string>;
  events?: Map<string, IAction[]>;
}

export class Control {
  private _id: string;
  private _meta: ControlMetadata;
  private _parent: Control;
  private _children: Control[];
  private _events: Map<string, IProperty<IAction[]>>;
  protected _properties: Map<string, IProperty<string>>;

  constructor(
    id: string,
    meta: ControlMetadata,
    parameters?: IControlParameters
  ) {
    this._id = id;
    this._meta = meta;
    this._parent = null;
    this._children = [];
    this._properties = new Map<string, IProperty<string>>();
    this._events = new Map<string, IProperty<IAction[]>>();

    let controlParameters = parameters || <IControlParameters>{};

    this._meta.supportedProperties.forEach((metaProperty, propertyKey) => {
      let controlProperty = 'getOptions' in metaProperty ?
        new ControlPropertyWithOptions(
          <ControlPropertyWithOptions<string>>metaProperty
        ) :
        new ControlProperty(metaProperty);

      if (controlParameters.properties &&
          controlParameters.properties.has(propertyKey)) {
        controlProperty.setValue(controlParameters.properties.get(propertyKey));
      }

      this._properties.set(propertyKey, controlProperty);
    });

    this._meta.supportedEvents.forEach((metaProperty, eventKey) => {
      let controlEventProperty =  new ControlProperty(metaProperty);

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

  static getMeta(): ControlMetadata {
    throw new Error('Not Implemented!');
  }
}
