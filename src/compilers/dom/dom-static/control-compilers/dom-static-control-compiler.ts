import { IControlCompiler } from '../../../control-compiler';
import { CSSClassCompiler } from '../../css-compiler';
import { IProperty } from '../../../../core/property';
import { Control } from '../../../../core/controls/control';

export interface IDOMStaticCompiledControl {
  source: Control;
  markup: string;
  cssClasses?: Set<string>;
}

export class DOMStaticControlCompiler<TControl extends Control> implements IControlCompiler<IDOMStaticCompiledControl> {
  binding: Map<string, string>;

  compile(control: TControl): Promise<IDOMStaticCompiledControl> {
    let cssClassPromise: Promise<Set<string>>;

    if (control.meta.styles.size > 0) {
      cssClassPromise = CSSClassCompiler.compile(control);
    } else {
      cssClassPromise = Promise.resolve(null);
    }

    return cssClassPromise.then((cssClasses) => {
      return {
        source: control,
        markup: this.getMarkup(control),
        cssClasses: cssClasses
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

  protected bindCSSClass(control: Control): string {
    let cssClasses = [];

    let overrides = control.overrides;
    while (overrides) {
      cssClasses.push(
        overrides.id === '__predefined__' ?
          `vargin-${control.meta.type}` :
          `vargin-${control.id}--${overrides.id}`
      );
      overrides = overrides.parent;
    }

    return cssClasses.join(' ');
  }

  protected getMarkup(control: TControl) {
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
