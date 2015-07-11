import ControlGroup from 'core/controls/group';

export default class BaseControl {
  private _type: string;
  private _name: string;
  private _description: string;
  private _group: ControlGroup;

  constructor(type, name, description, groupType) {
    this._type = type;
    this._name = name;
    this._description = description;
    this._group = ControlGroup.get(groupType);
  }

  /**
   * Type of the control.
   * @returns {string}
   */
  get type() {
    return this._type;
  }

  /**
   * Localizable and human-readable control name.
   * @returns {string}
   */
  get name() {
    return this._name;
  }

  /**
   * Localizable and human-readable control description.
   * @returns {string}
   */
  get description() {
    return this._description;
  }

  /**
   * Control group instance.
   * @returns {ControlGroup}
   */
  get group() {
    return this._group;
  }
}