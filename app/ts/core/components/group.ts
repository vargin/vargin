const groups = new Map<string, ComponentGroup>();

/**
 * ComponentGroup represents group of related components.
 */
export default class ComponentGroup {
  private _type: string;
  private _name: string;
  private _description: string;

  constructor(type: string, name: string, description: string) {
    this._type = type;
    this._name = name;
    this._description = description;
  }

  /**
   * Type of the component group.
   * @returns {string}
   */
  get type() {
    return this._type;
  }

  /**
   * Localizable and human-readable component group name.
   * @returns {string}
   */
  get name() {
    return this._name;
  }

  /**
   * Localizable and human-readable component group description.
   * @returns {string}
   */
  get description() {
    return this._description;
  }

  /**
   * Register new component group into static repository.
   * @param {string} type Type of the component group.
   * @param {string} name Name of the component group.
   * @param {string} description Description of the component group.
   * @returns {ComponentGroup} Registered component group
   */
  static register(type, name, description): ComponentGroup {
    if (groups.has(type)) {
      throw new Error('Group with type ' + type + ' is already registered!');
    }

    var group = new ComponentGroup(type, name, description);
    groups.set(type, group);

    return group;
  }

  static get(type: string): ComponentGroup {
    return groups.get(type);
  }
}