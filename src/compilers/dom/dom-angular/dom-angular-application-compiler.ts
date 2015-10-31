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
import { ListControlCompiler } from 'compilers/dom/dom-angular/control-compilers/visual/list-control-compiler';
import { ListItemControlCompiler } from 'compilers/dom/dom-angular/control-compilers/visual/list-item-control-compiler';
import { RangeControlCompiler } from 'compilers/dom/dom-angular/control-compilers/visual/range-control-compiler';
import { TextInputControlCompiler } from 'compilers/dom/dom-angular/control-compilers/visual/text-input-control-compiler';

import {
  ISerializedServiceControl,
  ServiceControlCompiler
} from 'compilers/dom/dom-angular/control-compilers/service/service-control-compiler';

const VISUAL_CONTROL_COMPILERS = new Map<Function, DOMAngularControlCompiler<Control>>(
  <[Function, DOMAngularControlCompiler<Control>][]>[
    [ButtonControl, new ButtonControlCompiler()],
    [ContainerControl, new ContainerControlCompiler()],
    [LabelControl, new LabelControlCompiler()],
    [LinkControl, new LinkControlCompiler()],
    [ListControl, new ListControlCompiler()],
    [ListItemControl, new ListItemControlCompiler()],
    [RangeControl, new RangeControlCompiler()],
    [TextInputControl, new TextInputControlCompiler()]
  ]
);

const SERVICE_CONTROL_COMPILER = new ServiceControlCompiler();

export interface ICompiledDOMAngularApplication {
  pages: Array<{ id: string; name: string; markup: string }>;
  services: ISerializedServiceControl[];
}

export class DOMAngularApplicationCompiler implements IApplicationCompiler<ICompiledDOMAngularApplication> {
  compile(application: Application) {
    let queue = new PromiseQueue();

    let services = [];
    application.serviceRoot.getChildren().forEach((control: Control) => {
      queue.enqueue(() => {
        return SERVICE_CONTROL_COMPILER.compile(control).then(
          (service) => services.push(service)
        );
      });
    });

    let pages = [];
    application.pages.forEach((page: ApplicationPage) => {
      queue.enqueue(() => {
        return this.compileVisualControl(page.root).then((root) => {
          pages.push({
            id: page.id,
            name: page.name,
            markup: `
            <style type="text/css">${root.cssClass.text}</style>
            ${root.markup}
          `
          });
        });
      });
    });

    return queue.enqueue(() => ({ services, pages }));
  }

  decompile(compiledApplication: ICompiledDOMAngularApplication) {
    return null;
  }

  private compileVisualControl(control: Control): Promise<IDOMStaticCompiledControl> {
    let controlCompiler = <DOMAngularControlCompiler<Control>>
      VISUAL_CONTROL_COMPILERS.get(control.constructor);

    return controlCompiler.compile(control).then((compiledControl) => {
      let children = control.getChildren();

      if (!children.length) {
        return compiledControl;
      }

      let queue = new PromiseQueue();
      let childrenCssText = '';
      let childrenMarkup = '';

      children.forEach((child) => {
        queue.enqueue(() => {
          return this.compileVisualControl(child).then((compiledChild) => {
            childrenCssText += compiledChild.cssClass.text.trim();
            childrenMarkup += compiledChild.markup.trim();
          });
        });
      });

      return queue.enqueue(() => {
        compiledControl.cssClass.text += childrenCssText;
        compiledControl.markup = compiledControl.markup.replace(
          '{children}', childrenMarkup
        );

        return compiledControl;
      });
    });
  }
}
