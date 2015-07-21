import { IProperty } from 'core/property';
import { IAction } from 'core/actions/action';
import ControlGroup from 'core/controls/control-group';

export default class BaseControl<TProperties> {
  private _type: string;
  private _name: string;
  private _description: string;
  private _group: ControlGroup;
  private _properties: TProperties;
  private _events: Array<IProperty<Array<IAction>>>;

  constructor(
    type: string,
    name: string,
    description: string,
    groupType: string,
    properties?: TProperties,
    events?: Array<IProperty<Array<IAction>>>
  ) {
    this._type = type;
    this._name = name;
    this._description = description;
    this._group = ControlGroup.get(groupType);
    this._properties = properties;
    this._events = events || [];
  }

  clone(): BaseControl<TProperties> {
    throw new Error('Not Implemented');
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

  /**
   * List of configurable control properties.
   * @returns {TProperties}
   */
  get properties() {
    return this._properties;
  }

  /**
   * List of event names supported by control.
   * @returns {Array<IProperty<Array<IAction>>>}
   */
  get events() {
    return this._events;
  }
}