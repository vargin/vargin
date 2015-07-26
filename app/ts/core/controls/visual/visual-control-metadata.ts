import { IProperty } from 'core/property';
import { IAction } from 'core/actions/action';
import { ControlMetadata } from 'core/controls/control-metadata';

export class VisualControlMetadata extends ControlMetadata {
  /**
   * List of the supported styles with the default value.
   * @returns {Map<string, IProperty<string>>}
   */
  supportedStyles: Map<string, IProperty<string>>;

  constructor(
    type: string,
    name: string,
    description: string,
    supportedEvents: Map<string, IProperty<Array<IAction>>>,
    supportedProperties: Map<string, IProperty<string>>,
    supportedStyles: Map<string, IProperty<string>>
  ) {
    super(type, name, description, supportedEvents, supportedProperties);

    this.supportedStyles = supportedStyles || new Map();
  }
}
