/// <reference path="../../../../../typings/tsd.d.ts" />
import { IProperty } from 'core/property';
import BaseControl from 'core/controls/base-control';
import { StyleRepository } from 'core/style-repository';

export interface IVisualControl {
  getStyleList(): Array<IProperty<string>>,
  getStyleObject(): { [key: string]: string; }
}

export class BaseVisualControl<TProperties>
                     extends BaseControl<TProperties>
                     implements IVisualControl {
  private _styles: Array<IProperty<string>> = [];

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

      styleProperty.setValue(styles[styleKey]);

      this._styles.push(styleProperty);
    });
  }

  getStyleList() {
    return this._styles;
  }

  getStyleObject() {
    return this._styles.reduce((styleObject, property) => {
      styleObject[property.getType()] = property.getValue();
      return styleObject;
    }, <{ [key: string]: string; }>{});
  }
}