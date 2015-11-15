import { IProperty } from '../property';
import { IOverrides, Overrides } from '../overrides/overrides';
import {
  OverrideProperty, OverridePropertyWithOptions
} from '../overrides/override-property';
import { ControlMetadata } from './control-metadata';
import { UtilsService } from '../services/utils-service';

export class Control {
  private _overrides: IOverrides;
  private _id: string;
  private _meta: ControlMetadata;
  private _parent: Control;
  private _children: Control[];
  private _cache: {
    properties: Map<string, OverrideProperty<string, Control>>;
    styles: Map<string, OverrideProperty<string, Control>>;
    events: Map<string, OverrideProperty<string, Control>>;
  };

  protected predefinedOverrides: IOverrides;

  constructor(
    id: string,
    meta: ControlMetadata,
    overrides?: IOverrides
  ) {
    this._id = id;
    this._meta = meta;
    this._parent = null;
    this._children = [];

    overrides = overrides || new Overrides('__default__', 'default');

    this._overrides = this.predefinedOverrides || overrides;

    // If we have predefined overrides then:
    // 1. If input overrides root is predefined as well - we should replace with
    //    the current predefined overrides, and make the rest as children.
    // 2. If input overrides don't contain predefined root or input overrides
    //    are not provided and we use default overrides layer - we'll have to
    //    make it as child of predefined overrides.
    if (this.predefinedOverrides) {
      (this.predefinedOverrides.id === overrides.id ?
        overrides.children : [overrides]
      ).forEach(
        (child) => this._overrides.add(child)
      );
    }

    if (this._overrides.id !== '__default__') {
      this._overrides = this._overrides.find('__default__');
    }

    this._cache = {
      properties: new Map<string, OverrideProperty<string, Control>>(),
      styles: new Map<string, OverrideProperty<string, Control>>(),
      events: new Map<string, OverrideProperty<string, Control>>()
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
   * @returns {IOverrides}
   */
  get overrides() {
    return this._overrides;
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
    return this.getPropertyView('properties', key);
  }

  getStyle(key: string): IProperty<string> {
    return this.getPropertyView('styles', key);
  }

  getEvent(key: string): IProperty<string> {
    return this.getPropertyView('events', key);
  }

  private getPropertyView(groupKey, valueKey) {
    let property = this._cache[groupKey].get(valueKey);

    if (!property) {
      let metaProperty = this._meta[groupKey].get(valueKey);

      if (!metaProperty) {
        return null;
      }

      let MetaPropertyType = 'getOptions' in metaProperty ?
        OverridePropertyWithOptions :
        OverrideProperty;

      property = new MetaPropertyType(
        metaProperty, this, this._overrides.forKey(groupKey, valueKey)
      );

      this._cache[groupKey].set(valueKey, property);
    }

    return property;
  }

  static getMeta(): ControlMetadata {
    throw new Error('Not Implemented!');
  }
}
