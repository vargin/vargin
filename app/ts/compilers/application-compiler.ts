import { ICompiler } from 'compilers/compiler';
import { Application } from 'core/application';

export interface IApplicationCompiler<TCompiledApplication> extends ICompiler<Application, TCompiledApplication> {
  compile(application: Application): Promise<TCompiledApplication>;
  decompile(compiledApplication: TCompiledApplication): Promise<Application>;
}
