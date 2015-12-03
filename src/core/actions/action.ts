import { IProperty } from '../property';
import { Application } from '../application';
import { IOverrides, Overrides } from '../overrides/overrides';
import {
  OverrideProperty,
  OverridePropertyWithOptions
} from '../overrides/override-property';
import { ActionMetadata } from './action-metadata';
import { UtilsService } from '../services/utils-service';

export interface IAction {
  meta: ActionMetadata;
  overrides: IOverrides;

  perform(application: Application): Promise<boolean>;
  getProperty(key: string): IProperty<string>;
}

export class Action implements IAction {
  private _meta: ActionMetadata;
  private _overrides: IOverrides;
  private _properties: Map<string, IProperty<string>>;

  constructor(meta: ActionMetadata, overrides: IOverrides) {
    this._meta = meta;

    this._overrides = overrides || new Overrides('default');
    this._properties = new Map<string, IProperty<string>>();
  }

  get overrides() {
    return this._overrides;
  }

  get meta() {
    return this._meta;
  }

  perform(application: Application) {
    return Promise.reject<boolean>(new Error('Not Implemented!'));
  }

  getProperty(key) {
    let property = this._properties.get(key);

    if (!property) {
      let metaProperty = this._meta.properties.get(key);

      if (!metaProperty) {
        return null;
      }

      let MetaPropertyType = 'getOptions' in metaProperty ?
        OverridePropertyWithOptions :
        OverrideProperty;

      property = new MetaPropertyType(
        metaProperty, this, this._overrides.forKey<string>('properties', key)
      );

      this._properties.set(key, property);
    }

    return property;
  }
}
