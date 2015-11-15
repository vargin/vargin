import { IProperty } from '../property';

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
   * @returns {Map<string, IProperty<string>>}
   */
  events: Map<string, IProperty<string>>;

  /**
   * List of the supported properties with the default value.
   * @returns {Map<string, IProperty<string>>}
   */
  properties: Map<string, IProperty<string>>;

  /**
   * List of the supported styles with the default value.
   * @returns {Map<string, IProperty<string>>}
   */
  styles: Map<string, IProperty<string>>;

  constructor(
    type: string,
    name: string,
    description: string,
    events?: Map<string, IProperty<string>>,
    properties?: Map<string, IProperty<string>>,
    styles?: Map<string, IProperty<string>>
  ) {
    this.type = type;
    this.name = name;
    this.description = description;

    this.events = events || new Map<string, IProperty<string>>();
    this.properties = properties || new Map<string, IProperty<string>>();
    this.styles = styles || new Map<string, IProperty<string>>();
  }
}
