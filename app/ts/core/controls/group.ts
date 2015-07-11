const groups = new Map<string, ControlGroup>();

/**
 * ControlGroup represents group of related controls.
 */
export default class ControlGroup {
  private _type: string;
  private _name: string;
  private _description: string;

  constructor(type: string, name: string, description: string) {
    this._type = type;
    this._name = name;
    this._description = description;
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
   * Register new control group into static repository.
   * @param {string} type Type of the control group.
   * @param {string} name Name of the control group.
   * @param {string} description Description of the control group.
   * @returns {ControlGroup} Registered control group
   */
  static register(type, name, description): ControlGroup {
    if (groups.has(type)) {
      throw new Error('Group with type ' + type + ' is already registered!');
    }

    var group = new ControlGroup(type, name, description);
    groups.set(type, group);

    return group;
  }

  static get(type: string): ControlGroup {
    return groups.get(type);
  }
}