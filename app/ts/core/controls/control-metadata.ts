import { IProperty } from 'core/property';

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
   * @returns {Array<string>}
   */
  supportedEvents: Array<string>;

  /**
   * List of the supported properties with the default value.
   * @returns {Map<string, IProperty<string>>}
   */
  supportedProperties: Map<string, IProperty<string>>;

  constructor(
    type: string,
    name: string,
    description: string,
    supportedEvents?: Array<string>,
    supportedProperties?: Map<string, IProperty<string>>
  ) {
    this.type = type;
    this.name = name;
    this.description = description;
    this.supportedEvents = Object.freeze(supportedEvents || []);
    this.supportedProperties = supportedProperties || new Map();
  }
}
