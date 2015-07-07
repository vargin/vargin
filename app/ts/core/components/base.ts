import ComponentGroup from 'core/components/group';

export default class BaseComponent {
  private _type: string;
  private _name: string;
  private _description: string;
  private _group: ComponentGroup;

  constructor(type, name, description, groupType) {
    this._type = type;
    this._name = name;
    this._description = description;
    this._group = ComponentGroup.get(groupType);
  }

  /**
   * Type of the component.
   * @returns {string}
   */
  get type() {
    return this._type;
  }

  /**
   * Localizable and human-readable component name.
   * @returns {string}
   */
  get name() {
    return this._name;
  }

  /**
   * Localizable and human-readable component description.
   * @returns {string}
   */
  get description() {
    return this._description;
  }

  /**
   * Component group instance.
   * @returns {ComponentGroup}
   */
  get group() {
    return this._group;
  }
}