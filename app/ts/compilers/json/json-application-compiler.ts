import { Application } from 'core/application';
import { ApplicationPage } from 'core/application-page';

import { IApplicationCompiler } from 'compilers/application-compiler';
import {
  IJSONControl,
  JSONControlCompiler
} from 'compilers/json/json-control-compiler';

interface IJSONApplication {
  id: string;
  name: string;
  description: string;
  pages: Array<{
    id: string;
    name: string;
    root: IJSONControl;
  }>;
}

export class JSONApplicationCompiler implements IApplicationCompiler<string> {
  private _controlCompiler: JSONControlCompiler = new JSONControlCompiler();

  compile(application: Application) {
    let plainApplicationObject = {
      id: application.id,
      name: application.name,
      description: application.description,
      pages: application.pages.map((page) => {
        return {
          id: page.id,
          name: page.name,
          root: this._controlCompiler.compile(page.root)
        };
      })
    };

    return JSON.stringify(plainApplicationObject);
  }

  decompile(compiledApplication: string) {
    let plainApplicationObject = <IJSONApplication>JSON.parse(
      compiledApplication
    );

    return new Application(
      plainApplicationObject.id,
      plainApplicationObject.name,
      plainApplicationObject.description,
      plainApplicationObject.pages.map((plainApplicationPage) => {
        return new ApplicationPage(
          plainApplicationPage.id,
          plainApplicationPage.name,
          this._controlCompiler.decompile(plainApplicationPage.root)
        );
      })
    );
  }
}
