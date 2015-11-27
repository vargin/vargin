import { ICompiler } from '../compiler';
import { Control } from '../../core/controls/control';
import { IOverrides } from '../../core/overrides/overrides';

class CssCompiler implements ICompiler<Control, Set<string>>{
  compile(control: Control) {
    let cssClasses = new Set<string>();

    let overridesToCompile = [control.overrides.getRoot()];
    while (overridesToCompile.length) {
      let override = overridesToCompile.pop();

      let compiledOverride = this.compileOverrides(control, override);
      if (compiledOverride) {
        cssClasses.add(compiledOverride);
      }

      overridesToCompile.push(...override.children);
    }

    return Promise.resolve(cssClasses);
  }

  decompile(compiledCSS: Set<string>): Promise<Control> {
    return Promise.resolve<Control>(null);
  }

  private compileOverrides(control: Control, overrides: IOverrides) {
    let cssClassName = overrides.id === '__predefined__' ?
      `vargin-${control.meta.type}` :
      `vargin-${control.id}--${overrides.id}`;

    let text = '';
    control.meta.styles.forEach((meta, key) => {
      let value = overrides.getValue('styles', key);

      if (!overrides.parent ||
          overrides.parent.getValue('styles', key) !== value) {
        text += `${key}: ${value || meta.getValue()};`;
      }
    });

    return text && `.${cssClassName} { ${text} }`;
  }
}

export const CSSClassCompiler = new CssCompiler();
