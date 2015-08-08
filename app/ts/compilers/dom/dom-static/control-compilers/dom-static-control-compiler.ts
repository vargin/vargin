import { IControlCompiler } from 'compilers/control-compiler';
import {
  ICompiledCSSClass,
  CSSClassCompiler
} from 'compilers/dom/css-compiler';
import { Control } from 'core/controls/control';
import { VisualControl } from 'core/controls/visual/visual-control';

export interface IDOMStaticCompiledControl {
  source: Control;
  markup: string;
  cssClass?: ICompiledCSSClass;
}

export class DOMStaticControlCompiler<TControl extends Control>
       implements IControlCompiler<IDOMStaticCompiledControl> {
  compile(control: TControl) {
    var cssClass = null;

    if (VisualControl.isVisualControl(control)) {
      cssClass = CSSClassCompiler.compile(<VisualControl>(<Control>control));
    }

    return {
      source: control,
      markup: this.getMarkup(control, cssClass),
      cssClass: cssClass
    }
  }

  decompile() {
    return null;
  }

  protected getMarkup(control: TControl, cssClass?: ICompiledCSSClass) {
    return '';
  }

  protected buildHTMLElement(
    tagName: string, content: string = '', attributes?: Map<string, string>
  ) {
    var attributesString = '';
    if (attributes && attributes.size) {
      attributes.forEach((value, key) => {
        attributesString += ` ${key}="${value}"`
      });
    }

    return `<${tagName}${attributesString}>${content}</${tagName}>`
  }
}