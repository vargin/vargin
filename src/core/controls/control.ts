import { IProperty } from '../property';
import { IOverrides, Overrides } from '../overrides/overrides';
import { Trigger } from '../triggers/trigger';
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
  private _propertyCache: Map<string, Map<string, OverrideProperty<string, Control>>> =
    new Map<string, Map<string, OverrideProperty<string, Control>>>();
  private _triggers: Trigger[];

  protected predefinedOverrides: IOverrides;

  constructor(
    id: string,
    meta: ControlMetadata,
    overrides?: IOverrides,
    triggers?: Trigger[]
  ) {
    this._id = id;
    this._meta = meta;
    this._parent = null;
    this._children = [];
    this._triggers = triggers || [];

    overrides = overrides || new Overrides('default');

    this._overrides = this.predefinedOverrides || overrides;

    // If we have predefined overrides then:
    // 1. If input overrides root is predefined as well - we should replace with
    //    the current predefined overrides, and make the rest as children.
    // 2. If input overrides don't contain predefined root or input overrides
    //    are not provided and we use default overrides layer - we'll have to
    //    make it as child of predefined overrides.
    if (this.predefinedOverrides) {
      let rootOverrides = overrides.getRoot();
      (this.predefinedOverrides.name === rootOverrides.name ?
          rootOverrides.children : [rootOverrides]
      ).forEach(
        (child) => this._overrides.add(child)
      );
    }

    if (this._overrides.name !== overrides.name) {
      this._overrides = this._overrides.find(overrides.name);
    }
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
   * Sets control overrides.
   * @param {IOverrides} value
   */
  set overrides(value: IOverrides) {
    this._overrides = value;

    this._propertyCache.forEach((group, groupKey) => {
      group.forEach((property, valueKey) => {
        property.setOverride(
          this._overrides.forKey<string>(groupKey, valueKey)
        );
      });
    });
  }

  /**
   * List of triggers associated with the control.
   * @returns {Array.<Trigger>}
   */
  get triggers() {
    return this._triggers;
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
   * Indicates whether control can host other controls.
   * @returns {boolean}
   */
  canHaveChildren() {
    return false;
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
    let cacheGroup = this._propertyCache.get(groupKey);

    if (!cacheGroup) {
      cacheGroup = new Map<string, OverrideProperty<string, Control>>();
      this._propertyCache.set(groupKey, cacheGroup);
    }

    let property = cacheGroup.get(valueKey);

    if (!property) {
      let metaProperty = this._meta[groupKey].get(valueKey);

      if (!metaProperty) {
        return null;
      }

      let MetaPropertyType = 'getOptions' in metaProperty ?
        OverridePropertyWithOptions :
        OverrideProperty;

      property = new MetaPropertyType(
        metaProperty, this, this._overrides.forKey<string>(groupKey, valueKey)
      );

      cacheGroup.set(valueKey, property);
    }

    return property;
  }

  static getMeta(): ControlMetadata {
    throw new Error('Not Implemented!');
  }
}
