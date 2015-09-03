import { IProperty } from 'core/property';
import {
  ControlProperty,
  ControlPropertyWithOptions
} from 'core/controls/control-property';
import { ActionMetadata } from 'core/actions/action-metadata';

export interface IAction {
  name: string;
  type: string;
  properties: Map<string, IProperty<string>>;

  perform(): Promise<boolean>;
}

export class Action implements IAction {
  private _meta: ActionMetadata;
  private _properties: Map<string, IProperty<string>>;

  constructor(meta: ActionMetadata, properties?: Map<string, string>) {
    this._meta = meta;
    this._properties = new Map<string, IProperty<string>>();

    meta.supportedProperties.forEach((metaProperty, propertyKey) => {
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

  get name() {
    return this._meta.name;
  }

  get type() {
    return this._meta.type;
  }

  get properties() {
    return this._properties;
  }

  perform() {
    return Promise.reject<boolean>(new Error('Not Implemented!'));
  }
}