import { Application } from '../../core/application';
import { ApplicationPage } from '../../core/application-page';

import { PromiseQueue } from '../../core/tools/promise-queue';

import { Control } from '../../core/controls/control';
import { ButtonControl } from '../../core/controls/visual/button-control';
import {
  ContainerControl
} from '../../core/controls/visual/container-control';
import { LabelControl } from '../../core/controls/visual/label-control';
import { LinkControl } from '../../core/controls/visual/link-control';
import {
  ListControl,
  ListItemControl
} from '../../core/controls/visual/list-control';
import { RangeControl } from '../../core/controls/visual/range-control';
import {
  TextInputControl
} from '../../core/controls/visual/text-input-control';

import { IApplicationCompiler } from '../application-compiler';
import { IControlCompiler } from '../control-compiler';

import {
  AngularControlCompiler,
  IAngularCompiledControl
} from './control-compilers/angular-control-compiler';

import {
  ButtonControlCompiler
} from './control-compilers/visual/button-control-compiler';
import {
  ContainerControlCompiler
} from './control-compilers/visual/container-control-compiler';
import {
  LabelControlCompiler
} from './control-compilers/visual/label-control-compiler';
import {
  LinkControlCompiler
} from './control-compilers/visual/link-control-compiler';
import {
  ListControlCompiler
} from './control-compilers/visual/list-control-compiler';
import {
  ListItemControlCompiler
} from './control-compilers/visual/list-item-control-compiler';
import {
  RangeControlCompiler
} from './control-compilers/visual/range-control-compiler';
import {
  TextInputControlCompiler
} from './control-compilers/visual/text-input-control-compiler';

import * as JSONControl from '../json/json-control-compiler';

const VISUAL_CONTROL_COMPILERS = new Map<Function, AngularControlCompiler<Control>>(
  <[Function, AngularControlCompiler<Control>][]>[
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

const SERVICE_CONTROL_COMPILER = new JSONControl.JSONControlCompiler();

export interface ICompiledAngularApplication {
  css: string;
  pages: Array<{ id: string; name: string; markup: string }>;
  services: JSONControl.IJSONControl[];
}

export class AngularApplicationCompiler implements IApplicationCompiler<ICompiledAngularApplication> {
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

    let styles = new Set<string>();
    let pages = [];
    application.pages.forEach((page: ApplicationPage) => {
      queue.enqueue(() => {
        return this.compileControl(page.root).then((root) => {
          root.cssClasses.forEach((cssClass) => styles.add(cssClass));

          pages.push({
            id: page.id,
            name: page.name,
            markup: root.markup
          });
        });
      });
    });

    return queue.enqueue(() => {
      let css = '';
      styles.forEach((style) => css += style.trim());

      return { services, pages, css };
    });
  }

  decompile(compiledApplication: ICompiledAngularApplication) {
    return null;
  }

  private compileControl(control: Control): Promise<IAngularCompiledControl> {
    let controlCompiler = <AngularControlCompiler<Control>>
      VISUAL_CONTROL_COMPILERS.get(control.constructor);

    return controlCompiler.compile(control).then((compiledControl) => {
      let children = control.getChildren();

      if (!children.length) {
        return compiledControl;
      }

      let queue = new PromiseQueue();
      let childrenCSSClasses = new Set<string>();
      let childrenMarkup = '';

      children.forEach((child) => {
        queue.enqueue(() => {
          return this.compileControl(child).then((compiledChild) => {
            compiledChild.cssClasses.forEach(
              (cssClass) => childrenCSSClasses.add(cssClass)
            );
            childrenMarkup += compiledChild.markup.trim();
          });
        });
      });

      return queue.enqueue(() => {
        childrenCSSClasses.forEach(
          (cssClass) => compiledControl.cssClasses.add(cssClass)
        );
        compiledControl.markup = compiledControl.markup.replace(
          '{children}', childrenMarkup
        );

        return compiledControl;
      });
    });
  }
}