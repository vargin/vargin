import { Application } from 'core/application';

export interface ICompiler<TCompiledApplication> {
  compile(application: Application): TCompiledApplication;
  decompile(compiledApplication: TCompiledApplication): Application;
}