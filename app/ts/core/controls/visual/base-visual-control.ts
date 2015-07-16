/// <reference path="../../../../../typings/tsd.d.ts" />
import BaseControl from 'core/controls/base-control';
import { StyleProperty, StyleRepository } from 'core/style-repository';

export default class BaseVisualControl<TProperties> extends BaseControl<TProperties> {
  private _styles: Map<string, StyleProperty> =
    new Map<string, StyleProperty>();

  constructor(
    type: string,
    name: string,
    description: string,
    properties?: TProperties,
    styles?: { [key: string]: string; }
  ) {
    super(type, name, description, 'visual', properties);

    Object.keys(styles || {}).forEach((styleKey) => {
      let styleProperty = StyleRepository.getProperty(styleKey);

      styleProperty.value = styles[styleKey];

      this._styles.set(styleKey, styleProperty);
    });
  }

  get styles() {
    var styles = {};

    this._styles.forEach((styleProperty) => {
      styles[styleProperty.type] = styleProperty.value;
    });

    return styles;
  }
}