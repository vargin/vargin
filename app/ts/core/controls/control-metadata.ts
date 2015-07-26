import { IProperty } from 'core/property';
import { IAction } from 'core/actions/action';

export class ControlMetadata {
  /**
   * Type of the control.
   * @returns {string}
   */
  type: string;

  /**
   * Localizable and human-readable control name.
   * @returns {string}
   */
  name: string;

  /**
   * Localizable and human-readable control description.
   * @returns {string}
   */
  description: string;

  /**
   * List of the events supported by control.
   * @returns {Array<IProperty>}
   */
  supportedEvents: Map<string, IProperty<Array<IAction>>>;

  /**
   * List of the supported properties with the default value.
   * @returns {Map<string, IProperty<string>>}
   */
  supportedProperties: Map<string, IProperty<string>>;

  constructor(
    type: string,
    name: string,
    description: string,
    supportedEvents?: Map<string, IProperty<Array<IAction>>>,
    supportedProperties?: Map<string, IProperty<string>>
  ) {
    this.type = type;
    this.name = name;
    this.description = description;
    this.supportedEvents = Object.freeze(supportedEvents || new Map());
    this.supportedProperties = supportedProperties || new Map();
  }
}
