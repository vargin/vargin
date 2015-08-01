import { ICompiler } from 'compilers/compiler';
import { VisualControl } from 'core/controls/visual/visual-control';

export interface ICompiledCSSClass {
  name: string;
  text: string;
}

class CssCompiler implements ICompiler<VisualControl, ICompiledCSSClass>{
  compile(control: VisualControl) {
    var cssClassName = `vargin-${control.meta.type}-${control.id}`;

    var text = `.${cssClassName} {`;
    control.styles.forEach((styleProperty, styleKey) => {
      text += `${styleKey}: ${styleProperty.getValue()};`;
    });
    text += '}';

    return {
      name: cssClassName,
      text: text
    };
  }

  decompile(compiledCSSClass: ICompiledCSSClass) {
    return null;
  }
}

export const CSSClassCompiler = new CssCompiler();