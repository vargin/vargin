import { IProperty } from 'core/property';
import { IAction } from 'core/actions/action';
import {
  ControlProperty,
  ControlPropertyWithOptions
} from 'core/controls/control-property';
import { ControlMetadata } from 'core/controls/control-metadata';

export default class BaseControl {
  private _id: string;
  private _meta: ControlMetadata;
  private _events: Array<IProperty<Array<IAction>>>;
  protected _properties: Map<string, IProperty<string>>;

  constructor(
    id: string,
    meta: ControlMetadata,
    properties?: Map<string, string>,
    events?: Array<IProperty<Array<IAction>>>
  ) {
    this._id = id;
    this._meta = meta;
    this._events = events || [];
    this._properties = new Map();

    this._meta.supportedProperties.forEach((metaProperty, propertyKey) => {
      var controlProperty = 'getOptions' in metaProperty ?
        new ControlPropertyWithOptions(
          <ControlPropertyWithOptions<string>>metaProperty
        ) :
        new ControlProperty(metaProperty);

      if (properties && properties.has(propertyKey)) {
        controlProperty.setValue(properties.get(propertyKey));
      }

      this._properties.set(propertyKey, controlProperty);
    });
  }

  /**
   * Unique id of the control.
   * @returns {string}
   */
  get id() {
    return this._id;
  }

  /**
   * Metadata that describes type of the control.
   * @returns {ControlMetadata}
   */
  get meta() {
    return this._meta;
  }

  /**
   * List of event names supported by control.
   * @returns {Array<IProperty<Array<IAction>>>}
   */
  get events() {
    return this._events;
  }
}