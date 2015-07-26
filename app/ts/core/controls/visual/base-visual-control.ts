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
import BaseControl from 'core/controls/base-control';

export default class BaseVisualControl extends BaseControl {
  private _styles: Map<string, IProperty<string>> = new Map();

  constructor(id, meta, properties?, styles?, events?) {
    super(id, meta, properties, events);

    (<VisualControlMetadata>this.meta).supportedStyles.forEach(
      (metaProperty, styleKey) => {
        var controlStyleProperty = 'getOptions' in metaProperty ?
          new ControlPropertyWithOptions(
              <ControlPropertyWithOptions<string>>metaProperty
          ) :
          new ControlProperty(metaProperty);

        if (styles && styles.has(styleKey)) {
          controlStyleProperty.setValue(styles.get(styleKey));
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