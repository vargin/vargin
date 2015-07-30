/// <reference path="../../../../../typings/tsd.d.ts" />
import { IProperty } from 'core/property';
import { IAction } from 'core/actions/action';
import {
  VisualControlMetadata
} from 'core/controls/visual/visual-control-metadata';
import {
  ControlProperty,
  ControlPropertyWithOptions
} from 'core/controls/control-property';
import { IControlParameters, Control } from 'core/controls/control';

export interface IVisualControlParameters extends IControlParameters {
  styles?: Map<string, string>
}

export class VisualControl extends Control {
  private _styles: Map<string, IProperty<string>> = new Map();

  constructor(id, meta, parameters?: IVisualControlParameters, children?) {
    super(id, meta, parameters, children);

    var parameters = parameters || {};

    (<VisualControlMetadata>this.meta).supportedStyles.forEach(
      (metaProperty, styleKey) => {
        var controlStyleProperty = 'getOptions' in metaProperty ?
          new ControlPropertyWithOptions(
              <ControlPropertyWithOptions<string>>metaProperty
          ) :
          new ControlProperty(metaProperty);

        if (parameters.styles && parameters.styles.has(styleKey)) {
          controlStyleProperty.setValue(parameters.styles.get(styleKey));
        }

        this._styles.set(styleKey, controlStyleProperty);
      }
    );
  }

  get styles() {
    return this._styles;
  }

  serializeStyles(): { [key: string]: string; }{
    var serializedStyles = <{ [key: string]: string; }>{};

    this._styles.forEach((styleProperty, styleKey) => {
      serializedStyles[styleKey] = styleProperty.getValue();
    });

    return serializedStyles;
  }
}