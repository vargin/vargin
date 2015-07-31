import { ICompiler } from 'compilers/compiler';
import { Application } from 'core/application';

export interface IApplicationCompiler<TCompiledApplication>
       extends ICompiler<Application, TCompiledApplication> {
  compile(application: Application): TCompiledApplication;
  decompile(compiledApplication: TCompiledApplication): Application;
}