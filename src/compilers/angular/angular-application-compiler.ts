import { Application } from '../../core/application';
import { ApplicationPage } from '../../core/application-page';

import { PromiseQueue } from '../../core/tools/promise-queue';

import { Control } from '../../core/controls/control';

import { IApplicationCompiler } from '../application-compiler';

import {
  IJSONControl,
  JSONControlCompiler
} from '../json/json-control-compiler';
import { AngularCSSCompiler } from './angular-css-compiler';

export interface ICompiledAngularApplication {
  css: string;
  services: IJSONControl[];
}

export class AngularApplicationCompiler implements IApplicationCompiler<ICompiledAngularApplication> {
  private cssCompiler = new AngularCSSCompiler();
  private controlCompiler = new JSONControlCompiler();

  compile(application: Application) {
    let queue = new PromiseQueue();

    let services = [];
    application.serviceRoot.getChildren().forEach((control: Control) => {
      queue.enqueue(() => {
        return this.controlCompiler.compile(control).then(
          (service) => services.push(service)
        );
      });
    });

    let styles = new Set<string>();

    application.pages.forEach((page: ApplicationPage) => {
      queue.enqueue(() => {
        return this.compileCSS(page.root).then(
          (css) => css.forEach((style) => styles.add(style))
        );
      });
    });

    return queue.enqueue(() => {
      // Record various quirks
      let css = `
        vargin-input {
          display: inline-flex;
        }

        vargin-input > input {
          flex: 1;

          background: inherit;
          color: inherit;
          border: none;
          font: inherit;
          padding: 0;
          margin: 0;
        }
      `;
      styles.forEach((style) => css += style.trim());

      return { services, css};
    });
  }

  decompile(compiledApplication: ICompiledAngularApplication) {
    return null;
  }

  private compileCSS(control: Control): Promise<Set<string>> {
    let cssPromise = control.meta.styles.size > 0 ?
      this.cssCompiler.compile(control) :
      Promise.resolve(new Set<string>());

    return cssPromise.then((css) => {
      return Promise.all(
        control.getChildren().map((child) => this.compileCSS(child))
      ).then((childrenCSS) => {
        childrenCSS.forEach(
          (childCSS) => childCSS.forEach((rule) => css.add(rule))
        );

        return css;
      });
    });
  }
}
