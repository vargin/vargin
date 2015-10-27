import { ICompiler } from 'compilers/compiler';
import { VisualControl } from 'core/controls/visual/visual-control';

export interface ICompiledCSSClass {
  name: string;
  text: string;
}

class CssCompiler implements ICompiler<VisualControl, ICompiledCSSClass>{
  compile(control: VisualControl) {
    let cssClassName = `vargin-${control.meta.type}-${control.id}`;

    let text = `.${cssClassName} {`;
    control.styles.forEach((styleProperty, styleKey) => {
      text += `${styleKey}: ${styleProperty.getValue()};`;
    });
    text += '}';

    return Promise.resolve({
      name: cssClassName,
      text: text
    });
  }

  decompile(compiledCSSClass: ICompiledCSSClass): Promise<VisualControl> {
    return null;
  }
}

export const CSSClassCompiler = new CssCompiler();
