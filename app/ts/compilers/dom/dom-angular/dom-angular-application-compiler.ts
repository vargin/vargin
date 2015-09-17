import { Application } from 'core/application';
import { ApplicationPage } from 'core/application-page';

import { Control } from 'core/controls/control';
import { ButtonControl } from 'core/controls/visual/button-control';
import { ContainerControl } from 'core/controls/visual/container-control';
import { LabelControl } from 'core/controls/visual/label-control';
import { LinkControl } from 'core/controls/visual/link-control';
import { RangeControl } from 'core/controls/visual/range-control';
import { TextInputControl } from 'core/controls/visual/text-input-control';

import { IApplicationCompiler } from 'compilers/application-compiler';
import { IControlCompiler } from 'compilers/control-compiler';

import {
  IDOMStaticCompiledControl
} from 'compilers/dom/dom-static/control-compilers/dom-static-control-compiler';

import {
  DOMAngularControlCompiler
} from 'compilers/dom/dom-angular/control-compilers/dom-angular-control-compiler';

import { ButtonControlCompiler } from 'compilers/dom/dom-angular/control-compilers/visual/button-control-compiler';
import { ContainerControlCompiler } from 'compilers/dom/dom-angular/control-compilers/visual/container-control-compiler';
import { LabelControlCompiler } from 'compilers/dom/dom-angular/control-compilers/visual/label-control-compiler';
import { LinkControlCompiler } from 'compilers/dom/dom-angular/control-compilers/visual/link-control-compiler';
import { RangeControlCompiler } from 'compilers/dom/dom-angular/control-compilers/visual/range-control-compiler';
import { TextInputControlCompiler } from 'compilers/dom/dom-angular/control-compilers/visual/text-input-control-compiler';

const CONTROL_COMPILERS = new Map<Function, DOMAngularControlCompiler<Control>>([
  [ButtonControl, new ButtonControlCompiler()],
  [ContainerControl, new ContainerControlCompiler()],
  [LabelControl, new LabelControlCompiler()],
  [LinkControl, new LinkControlCompiler()],
  [RangeControl, new RangeControlCompiler()],
  [TextInputControl, new TextInputControlCompiler()]
]);

export interface ICompiledDOMAngularApplication {
  pages: Array<{ id: string; name: string; markup: string }>;
}

export class DOMAngularApplicationCompiler implements IApplicationCompiler<ICompiledDOMAngularApplication> {
  compile(application: Application) {
    return {
      pages: application.pages.map((page: ApplicationPage) => {
        let compiledRoot = this.compileControl(page.root);

        return {
          id: page.id,
          name: page.name,
          markup: `
            <style type="text/css">${compiledRoot.cssClass.text}</style>
            ${compiledRoot.markup}
          `
        };
      })
    };
  }

  decompile(compiledApplication: ICompiledDOMAngularApplication): Application {
    return null;
  }

  private compileControl(control: Control): IDOMStaticCompiledControl {
    let controlCompiler = <DOMAngularControlCompiler<Control>>
      CONTROL_COMPILERS.get(control.constructor);
    let compiledControl = controlCompiler.compile(control);

    let children = control.getChildren();
    if (children.length) {
      let childrenCssText = '';
      let childrenMarkup = '';

      for (let child of children) {
        let compiledChild = this.compileControl(child);

        childrenCssText += compiledChild.cssClass.text.trim();
        childrenMarkup += compiledChild.markup.trim();
      }

      compiledControl.cssClass.text += childrenCssText;
      compiledControl.markup = compiledControl.markup.replace(
        '{children}', childrenMarkup
      );
    }

    return compiledControl;
  }
}
