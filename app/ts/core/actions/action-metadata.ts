import { IProperty } from 'core/property';

export class ActionMetadata {
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
   * List of the supported properties with the default value.
   * @returns {Map<string, IProperty<string>>}
   */
  supportedProperties: Map<string, IProperty<string>>;

  constructor(
    type: string,
    name: string,
    description: string,
    supportedProperties?: Map<string, IProperty<string>>
  ) {
    this.type = type;
    this.name = name;
    this.description = description;
    this.supportedProperties = supportedProperties ||
      new Map<string, IProperty<string>>();
  }
}