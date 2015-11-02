import { Application } from 'core/application';
import { ApplicationPage } from 'core/application-page';

import { PromiseQueue } from 'core/tools/promise-queue';

import { Control } from 'core/controls/control';
import { ButtonControl } from 'core/controls/visual/button-control';
import { ContainerControl } from 'core/controls/visual/container-control';
import { LabelControl } from 'core/controls/visual/label-control';
import { LinkControl } from 'core/controls/visual/link-control';
import {
  ListControl,
  ListItemControl
} from 'core/controls/visual/list-control';
import { RangeControl } from 'core/controls/visual/range-control';
import { TextInputControl } from 'core/controls/visual/text-input-control';

import { DatasourceControl } from 'core/controls/service/datasource-control';

import { IApplicationCompiler } from 'compilers/application-compiler';
import { IControlCompiler } from 'compilers/control-compiler';

import {
  IDOMStaticCompiledControl,
  DOMStaticControlCompiler
} from 'compilers/dom/dom-static/control-compilers/dom-static-control-compiler';

import { ButtonControlCompiler } from 'compilers/dom/dom-static/control-compilers/visual/button-control-compiler';
import { ContainerControlCompiler } from 'compilers/dom/dom-static/control-compilers/visual/container-control-compiler';
import { LabelControlCompiler } from 'compilers/dom/dom-static/control-compilers/visual/label-control-compiler';
import { LinkControlCompiler } from 'compilers/dom/dom-static/control-compilers/visual/link-control-compiler';
import { ListControlCompiler } from 'compilers/dom/dom-static/control-compilers/visual/list-control-compiler';
import { RangeControlCompiler } from 'compilers/dom/dom-static/control-compilers/visual/range-control-compiler';
import { TextInputControlCompiler } from 'compilers/dom/dom-static/control-compilers/visual/text-input-control-compiler';

const CONTROL_COMPILERS = new Map<Function, DOMStaticControlCompiler<Control>>(
  <[Function, DOMStaticControlCompiler<Control>][]>[
    [ButtonControl, new ButtonControlCompiler()],
    [ContainerControl, new ContainerControlCompiler()],
    [LabelControl, new LabelControlCompiler()],
    [LinkControl, new LinkControlCompiler()],
    [ListControl, new ListControlCompiler()],
    [ListItemControl, new ContainerControlCompiler()],
    [RangeControl, new RangeControlCompiler()],
    [TextInputControl, new TextInputControlCompiler()]
  ]
);

const PAGE_REGEX = /href="page:([0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12})"/g;

interface IBinding {
  index: number;
  item: Map<string, string>;
}

export class DOMStaticApplicationCompiler implements IApplicationCompiler<string> {
  bindingStack: IBinding[];

  compile(application: Application): Promise<string> {
    let queue = new PromiseQueue();

    let compiledApp = {
      styles: '',
      content: ''
    };

    this.bindingStack = [];

    application.pages.forEach((page) => {
      queue.enqueue(() => {
        return this.compileControl(page.root, application).then((root) => {
          let markup = root.markup.replace(
            PAGE_REGEX, (markup, pageId) => `href="#${pageId}"`
          );

          compiledApp.styles += `<style type="text/css">${root.cssClass.text}</style>`;

          compiledApp.content += `<section id="${page.id}">${markup}</section><hr />`;
        });
      });
    });

    return queue.enqueue(() => {
      return `
        <!DOCTYPE html>
         <html lang="en">
           <head>
             <meta charset="utf-8" />
             <title>${application.name}</title>
             ${compiledApp.styles}
           </head>
           <body>${compiledApp.content}</body>
         </html>
      `;
    });
  }

  decompile(compiledApplication: string): Promise<Application> {
    return null;
  }

  private compileControl(
    control: Control,
    application: Application
  ): Promise<IDOMStaticCompiledControl> {
    return this.getCompilerForControl(control).compile(control).then(
      (compiledControl) => {
        let controlChildren = control.getChildren();

        if (!controlChildren.length) {
          return compiledControl;
        }

        let childrenCssText = '';
        let childrenMarkup = '';

        let bindings: [string, string][][] = null;

        if ('datasource' in control) {
          let datasource = <DatasourceControl>application.serviceRoot.find(
            control['datasource'].getValue()
          );

          let serializedItems = datasource.items.getValue();
          if (serializedItems) {
            bindings = JSON.parse(datasource.items.getValue());
          }
        }

        return this.forEachChild(
          controlChildren,
          bindings,
          (child: Control) => {
            return this.compileControl(child, application).then(
              ({ cssClass, markup }) => {
                childrenCssText += cssClass.text;
                childrenMarkup += markup;
              }
            );
          }
        ).enqueue(() => {
          compiledControl.cssClass.text += childrenCssText;
          compiledControl.markup = compiledControl.markup.replace(
            '{children}', childrenMarkup
          );

          return compiledControl;
        });
      }
    );
  }

  private getCompilerForControl(control: Control) {
    let controlCompiler = <DOMStaticControlCompiler<Control>>
      CONTROL_COMPILERS.get(control.constructor);

    if (this.bindingStack.length) {
      controlCompiler.binding = this.bindingStack[0].item;
    }

    return controlCompiler;
  }

  private forEachChild(
    children: Control[],
    bindings: [string, string][][],
    callback: (control: Control) => void
  ) {
    let queue = new PromiseQueue();

    if (bindings && bindings.length) {
      let template = children[0];

      bindings.forEach((binding, index) => {
        queue.enqueue(() => {
          this.bindingStack.unshift({ index: index, item: new Map(binding) });
          return callback(template);
        });
        queue.enqueue(() => this.bindingStack.unshift());
      });
    } else {
      children.forEach((child) => queue.enqueue(() => callback(child)));
    }

    return queue;
  }
}
