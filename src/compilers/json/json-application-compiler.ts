import { Application } from '../../core/application';
import { ApplicationPage } from '../../core/application-page';

import { IApplicationCompiler } from '../application-compiler';
import {
  IJSONControl, JSONControlCompiler
} from './json-control-compiler';

interface IJSONApplication {
  id: string;
  name: string;
  description: string;
  serviceRoot: IJSONControl;
  pages: Array<{
    id: string;
    name: string;
    root: IJSONControl;
  }>;
}

export class JSONApplicationCompiler implements IApplicationCompiler<string> {
  private _controlCompiler: JSONControlCompiler = new JSONControlCompiler();

  compile(application: Application) {
    return this._controlCompiler.compile(application.serviceRoot).then(
      (compiledServiceRoot) => {
        return Promise.all(
          application.pages.map((page) => {
            return this._controlCompiler.compile(page.root).then(
              (compiledRoot) => {
                return { id: page.id, name: page.name, root: compiledRoot };
              }
            );
          })
        ).then((compiledPages) => {
          return JSON.stringify({
            id: application.id,
            name: application.name,
            description: application.description,
            serviceRoot: compiledServiceRoot,
            pages: compiledPages
          });
        });
      }
    );
  }

  decompile(compiledApplication: string) {
    let plainApplicationObject = <IJSONApplication>JSON.parse(
      compiledApplication
    );

    return this._controlCompiler.decompile(
      plainApplicationObject.serviceRoot
    ).then((decompiledServiceRoot) => {
      let pagePromises = plainApplicationObject.pages.map((plainApplicationPage) => {
        return this._controlCompiler.decompile(
          plainApplicationPage.root
        ).then((decompiledPageRoot) => {
          return new ApplicationPage(
            plainApplicationPage.id,
            plainApplicationPage.name,
            decompiledPageRoot
          );
        });
      });
      return Promise.all(pagePromises).then((decompiledPages) => {
        return new Application(
          plainApplicationObject.id,
          plainApplicationObject.name,
          plainApplicationObject.description,
          decompiledServiceRoot,
          decompiledPages
        );
      });
    });
  }
}
