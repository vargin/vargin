import { Application } from 'core/application';
import { ApplicationPage } from 'core/application-page';

import { Control } from 'core/controls/control';
import { ButtonControl } from 'core/controls/visual/button-control';
import { ContainerControl } from 'core/controls/visual/container-control';
import { LabelControl } from 'core/controls/visual/label-control';
import { RangeControl } from 'core/controls/visual/range-control';
import { TextInputControl } from 'core/controls/visual/text-input-control';

import { IApplicationCompiler } from 'compilers/application-compiler';
import { IControlCompiler } from 'compilers/control-compiler';

import {
  IDOMStaticCompiledControl,
  DOMStaticControlCompiler
} from 'compilers/dom/dom-static/control-compilers/dom-static-control-compiler';

import { ButtonControlCompiler } from 'compilers/dom/dom-static/control-compilers/visual/button-control-compiler';
import { ContainerControlCompiler } from 'compilers/dom/dom-static/control-compilers/visual/container-control-compiler';
import { LabelControlCompiler } from 'compilers/dom/dom-static/control-compilers/visual/label-control-compiler';
import { RangeControlCompiler } from 'compilers/dom/dom-static/control-compilers/visual/range-control-compiler';
import { TextInputControlCompiler } from 'compilers/dom/dom-static/control-compilers/visual/text-input-control-compiler';

const CONTROL_COMPILERS = new Map<Function, DOMStaticControlCompiler<Control>>([
  [ButtonControl, new ButtonControlCompiler()],
  [ContainerControl, new ContainerControlCompiler()],
  [LabelControl, new LabelControlCompiler()],
  [RangeControl, new RangeControlCompiler()],
  [TextInputControl, new TextInputControlCompiler()]
]);

export class DOMStaticApplicationCompiler implements IApplicationCompiler<string> {
  compile(application: Application) {
    let compiledRoot = this.compileControl(application.pages[0].root);

    return `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>${application.name}</title>
          <style type="text/css">${compiledRoot.cssClass.text}</style>
        </head>
        <body>${compiledRoot.markup}</body>
      </html>
    `;
  }

  decompile(compiledApplication: string): Application {
    return null;
  }

  private compileControl(control: Control): IDOMStaticCompiledControl {
    let controlCompiler = <DOMStaticControlCompiler<Control>>
      CONTROL_COMPILERS.get(control.constructor);
    let compiledControl = controlCompiler.compile(control);

    let children = control.getChildren();
    if (children.length) {
      let childrenCssText = '';
      let childrenMarkup = '';

      for (let child of children) {
        let compiledChild = this.compileControl(child);

        childrenCssText += compiledChild.cssClass.text;
        childrenMarkup += compiledChild.markup;
      }

      compiledControl.cssClass.text += childrenCssText;
      compiledControl.markup = compiledControl.markup.replace(
        '{children}', childrenMarkup
      );
    }

    return compiledControl;
  }
}
