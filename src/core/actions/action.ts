/// <reference path="../../../typings/tsd.d.ts" />
import { IProperty } from 'core/property';
import { IOverrides } from 'core/overrides/overrides';
import {
  OverrideProperty,
  OverridePropertyWithOptions
} from 'core/overrides/override-property';
import { ActionMetadata } from 'core/actions/action-metadata';
import { UtilsService } from 'core/services/utils-service';

export interface IAction {
  name: string;
  type: string;
  properties: Map<string, IProperty<string>>;
  overrides: IOverrides;

  perform(): Promise<boolean>;
}

export class Action implements IAction {
  private _meta: ActionMetadata;
  private _overrides: IOverrides;
  private _properties: Map<string, IProperty<string>>;

  constructor(meta: ActionMetadata, overrides: IOverrides) {
    this._meta = meta;

    this._overrides = overrides;
    this._properties = new Map<string, IProperty<string>>();

    meta.properties.forEach((metaProperty, propertyKey) => {
      let override = this._overrides.forKey<string>('properties', propertyKey);

      let property = 'getOptions' in metaProperty ?
        new OverridePropertyWithOptions(metaProperty, this, override) :
        new OverrideProperty(metaProperty, this, override);

      this._properties.set(propertyKey, property);
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

  get overrides() {
    return this._overrides;
  }

  perform() {
    return Promise.reject<boolean>(new Error('Not Implemented!'));
  }
}
