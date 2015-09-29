/// <reference path="../../../../../typings/tsd.d.ts" />
import { IProperty } from 'core/property';
import { IAction } from 'core/actions/action';
import {
  VisualControlMetadata
} from 'core/controls/visual/visual-control-metadata';
import { OwnedProperty, OwnedPropertyWithOptions } from 'core/owned-property';
import { IControlParameters, Control } from 'core/controls/control';

export interface IVisualControlParameters extends IControlParameters {
  styles?: Map<string, string>;
}

export class VisualControl extends Control {
  private _styles: Map<string, IProperty<string>> =
    new Map<string, IProperty<string>>();

  constructor(
    id: string,
    meta: VisualControlMetadata,
    parameters?: IVisualControlParameters
  ) {
    super(id, meta, parameters);

    let controlParameters = parameters || <IVisualControlParameters>{};

    (<VisualControlMetadata>this.meta).supportedStyles.forEach(
      (metaProperty, styleKey) => {
        let controlStyleProperty = 'getOptions' in metaProperty ?
          new OwnedPropertyWithOptions(
            this, <OwnedPropertyWithOptions<string, VisualControl>>metaProperty
          ) :
          new OwnedProperty(this, metaProperty);

        if (controlParameters.styles &&
            controlParameters.styles.has(styleKey)) {
          controlStyleProperty.setValue(controlParameters.styles.get(styleKey));
        }

        this._styles.set(styleKey, controlStyleProperty);
      }
    );
  }

  get styles() {
    return this._styles;
  }

  static isVisualControl(control: Control) {
    return 'styles' in control;
  }
}
