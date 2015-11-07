/// <reference path="../../../typings/tsd.d.ts" />
import { IProperty } from 'core/property';
import { OwnedProperty, OwnedPropertyWithOptions } from 'core/owned-property';
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

    meta.properties.forEach((metaProperty, propertyKey) => {
      let controlProperty = 'getOptions' in metaProperty ?
        new OwnedPropertyWithOptions(
          this,
          <OwnedPropertyWithOptions<string, Action>>metaProperty,
          propertyKey,
          properties || new Map<string, string>()
        ) :
        new OwnedProperty(
          this,
          metaProperty,
          propertyKey,
          properties || new Map<string, string>()
        );

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
