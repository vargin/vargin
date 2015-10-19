import { ICompiler } from 'compilers/compiler';
import { Control } from 'core/controls/control';

export interface IControlCompiler<TCompiledControl> extends ICompiler<Control, TCompiledControl> {
  compile(control: Control): Promise<TCompiledControl>;
  decompile(compiledControl: TCompiledControl): Promise<Control>;
}
