import { IProperty } from 'core/property';
import { IAction } from 'core/actions/action';
import {
  ControlProperty,
  ControlPropertyWithOptions
} from 'core/controls/control-property';
import { ControlMetadata } from 'core/controls/control-metadata';

export interface ISerializedControl {
  type: string;
  id?: string;
  parameters?: ISerializedControlParameters
}

export interface ISerializedControlParameters {
  properties?: Iterable<[string, string]>;
}

export interface IControlParameters {
  properties?: Map<string, string>,
  events?: Map<string, Array<IAction>>
}

export class Control {
  private _id: string;
  private _meta: ControlMetadata;
  private _events: Map<string, IProperty<Array<IAction>>>;
  protected _properties: Map<string, IProperty<string>>;

  constructor(
    id: string,
    meta: ControlMetadata,
    parameters?: IControlParameters
  ) {
    this._id = id;
    this._meta = meta;
    this._properties = new Map();
    this._events = new Map();

    var parameters = parameters || {};

    this._meta.supportedProperties.forEach((metaProperty, propertyKey) => {
      var controlProperty = 'getOptions' in metaProperty ?
        new ControlPropertyWithOptions(
          <ControlPropertyWithOptions<string>>metaProperty
        ) :
        new ControlProperty(metaProperty);

      if (parameters.properties && parameters.properties.has(propertyKey)) {
        controlProperty.setValue(parameters.properties.get(propertyKey));
      }

      this._properties.set(propertyKey, controlProperty);
    });

    this._meta.supportedEvents.forEach((metaProperty, eventKey) => {
      var controlEventProperty =  new ControlProperty(metaProperty);

      if (parameters.events && parameters.events.has(eventKey)) {
        controlEventProperty.setValue(parameters.events.get(eventKey));
      } else {
        controlEventProperty.setValue([]);
      }

      this._events.set(eventKey, controlEventProperty);
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

  serialize(): ISerializedControl {
    var serializedProperties = [];
    this._properties.forEach((property: IProperty<string>) => {
      serializedProperties.push([property.getType(), property.getValue()]);
    });

    return {
      id: this.id,
      type: this.meta.type,
      parameters: {
        properties: serializedProperties
      }
    };
  }

  static getMeta(): ControlMetadata {
    throw new Error('Not Implemented!');
  }
}