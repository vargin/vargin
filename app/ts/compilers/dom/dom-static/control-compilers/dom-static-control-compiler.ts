import { IControlCompiler } from 'compilers/control-compiler';
import {
  ICompiledCSSClass,
  CSSClassCompiler
} from 'compilers/dom/css-compiler';
import { IProperty } from 'core/property';
import { Control } from 'core/controls/control';
import { VisualControl } from 'core/controls/visual/visual-control';

export interface IDOMStaticCompiledControl {
  source: Control;
  markup: string;
  cssClass?: ICompiledCSSClass;
}

export class DOMStaticControlCompiler<TControl extends Control> implements IControlCompiler<IDOMStaticCompiledControl> {
  binding: Map<string, string>;

  compile(control: TControl) {
    let cssClass: ICompiledCSSClass = null;

    if (VisualControl.isVisualControl(control)) {
      cssClass = CSSClassCompiler.compile(<VisualControl>(<Control>control));
    }

    return {
      source: control,
      markup: this.getMarkup(control, cssClass),
      cssClass: cssClass
    };
  }

  decompile(): TControl {
    return null;
  }

  protected getValue(property: IProperty<string>): string {
    let rawValue = property.getValue();

    if (this.binding && rawValue.startsWith('bind:')) {
      return this.binding.get(rawValue.split(':')[1]);
    }

    return rawValue;
  }

  protected getMarkup(control: TControl, cssClass?: ICompiledCSSClass) {
    return '';
  }

  protected buildHTMLElement(
    tagName: string, content: string = '', attributes?: Map<string, string>
  ) {
    let attributesString = '';
    if (attributes && attributes.size) {
      attributes.forEach((value, key) => {
        attributesString += ` ${key}="${value}"`;
      });
    }

    return `<${tagName}${attributesString}>${content}</${tagName}>`;
  }
}
