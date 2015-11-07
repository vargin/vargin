import { IControlCompiler } from 'compilers/control-compiler';
import {
  ICompiledCSSClass,
  CSSClassCompiler
} from 'compilers/dom/css-compiler';
import { IProperty } from 'core/property';
import { Control } from 'core/controls/control';

export interface IDOMStaticCompiledControl {
  source: Control;
  markup: string;
  cssClass?: ICompiledCSSClass;
}

export class DOMStaticControlCompiler<TControl extends Control> implements IControlCompiler<IDOMStaticCompiledControl> {
  binding: Map<string, string>;

  compile(control: TControl): Promise<IDOMStaticCompiledControl> {
    let cssClassPromise: Promise<ICompiledCSSClass>;

    if (control.meta.styles.size > 0) {
      cssClassPromise = CSSClassCompiler.compile(control);
    } else {
      cssClassPromise = Promise.resolve(null);
    }

    return cssClassPromise.then((cssClass) => {
      return {
        source: control,
        markup: this.getMarkup(control, cssClass),
        cssClass: cssClass
      };
    });
  }

  decompile(): Promise<TControl> {
    return null;
  }

  protected bindValue(control: Control, propertyName: string): string {
    let rawValue = control.getProperty(propertyName).getValue();

    if (this.binding && rawValue.startsWith('bind:')) {
      return this.binding.get(rawValue.split(':')[1]).toString();
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
