import { ICompiler } from 'compilers/compiler';
import { Control } from 'core/controls/control';

export interface ICompiledCSSClass {
  name: string;
  text: string;
}

class CssCompiler implements ICompiler<Control, ICompiledCSSClass>{
  compile(control: Control) {
    let cssClassName = `vargin-${control.meta.type}-${control.id}`;

    let text = `.${cssClassName} {`;
    control.meta.supportedStyles.forEach((meta, key) => {
      text += `${key}: ${control.getStyle(key).getValue()};`;
    });
    text += '}';

    return Promise.resolve({
      name: cssClassName,
      text: text
    });
  }

  decompile(compiledCSSClass: ICompiledCSSClass): Promise<Control> {
    return null;
  }
}

export const CSSClassCompiler = new CssCompiler();
