import BaseControl from 'core/controls/base-control';

const groups = new Map<string, ControlGroup>();

/**
 * ControlGroup represents group of related controls.
 */
export default class ControlGroup {
  private _type: string;
  private _name: string;
  private _description: string;
  private _items: Array<BaseControl<any>>;

  constructor(
    type: string = 'Unknown Type',
    name: string = 'Unknown Name',
    description: string = 'Unknown Description',
    items: Array<BaseControl<any>> = []
  ) {
    this._type = type;
    this._name = name;
    this._description = description;
    this._items = items;
  }

  /**
   * Type of the control group.
   * @returns {string}
   */
  get type() {
    return this._type;
  }

  /**
   * Localizable and human-readable control group name.
   * @returns {string}
   */
  get name() {
    return this._name;
  }

  /**
   * Localizable and human-readable control group description.
   * @returns {string}
   */
  get description() {
    return this._description;
  }

  /**
   * List of controls associated with the group.
   * @returns {Array<BaseControl>}
   */
  get items() {
    return this._items;
  }

  /**
   * Register new control group into static repository.
   * @param {string} type Type of the control group.
   * @param {string} name Name of the control group.
   * @param {string} description Description of the control group.
   * @param {Array<BaseControls>} items Control list associated with the group.
   * @returns {ControlGroup} Registered control group
   */
  static register(type, name, description, items): ControlGroup {
    if (groups.has(type)) {
      throw new Error('Group with type ' + type + ' is already registered!');
    }

    var group = new ControlGroup(type, name, description, items);
    groups.set(type, group);

    return group;
  }

  static get(type: string): ControlGroup {
    return groups.get(type);
  }
}