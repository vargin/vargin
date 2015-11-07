import { IProperty } from 'core/property';
import { IAction } from 'core/actions/action';
import { OwnedProperty, OwnedPropertyWithOptions } from 'core/owned-property';
import { ControlMetadata } from 'core/controls/control-metadata';
import { ControlState } from 'core/controls/control-state';

export class Control {
  private _id: string;
  private _meta: ControlMetadata;
  private _parent: Control;
  private _children: Control[];
  private _cache: {
    properties: Map<string, OwnedProperty<string, Control>>;
    styles: Map<string, OwnedProperty<string, Control>>;
    events: Map<string, OwnedProperty<IAction[], Control>>;
  };
  private currentStateIndex: number = 0;
  protected _states: ControlState[];

  constructor(id: string, meta: ControlMetadata, states?: ControlState[]) {
    this._id = id;
    this._meta = meta;
    this._parent = null;
    this._children = [];

    if (states && states.length) {
      this._states = states;
    } else {
      this._states = [new ControlState('default')];
    }

    this._cache = {
      properties: new Map<string, OwnedProperty<string, Control>>(),
      styles: new Map<string, OwnedProperty<string, Control>>(),
      events: new Map<string, OwnedProperty<IAction[], Control>>()
    };
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

  getProperty(key: string): IProperty<string> {
    return this.getPropertyView(
      key,
      this._states[this.currentStateIndex].overrides.properties,
      this._cache.properties,
      this.meta.properties
    );
  }

  getStyle(key: string): IProperty<string> {
    return this.getPropertyView(
      key,
      this._states[this.currentStateIndex].overrides.styles,
      this._cache.styles,
      this.meta.styles
    );
  }

  getEvent(key: string): IProperty<IAction[]> {
    return this.getPropertyView(
      key,
      this._states[this.currentStateIndex].overrides.events,
      this._cache.events,
      this.meta.events
    );
  }

  private getPropertyView(key, overrides, cache, meta) {
    let property = cache.get(key);

    if (!property) {
      let metaProperty = meta.get(key);

      if (!metaProperty) {
        return null;
      }

      let MetaPropertyType = 'getOptions' in metaProperty ?
        OwnedPropertyWithOptions :
        OwnedProperty;

      property = new MetaPropertyType(this, metaProperty, key, overrides);

      cache.set(key, property);
    }

    return property;
  }

  static getMeta(): ControlMetadata {
    throw new Error('Not Implemented!');
  }
}
