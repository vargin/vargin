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
  AngularControlCompiler
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
import { AngularCSSCompiler } from './angular-css-compiler';

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
  templates: Map<string, string[]>;
}

export class AngularApplicationCompiler implements IApplicationCompiler<ICompiledAngularApplication> {
  private cssCompiler = new AngularCSSCompiler();

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
    let templates = new Map<string, string[]>();

    application.pages.forEach((page: ApplicationPage) => {
      queue.enqueue(() => {
        return this.compileMarkup(page.root).then((markup) => {
          pages.push({ id: page.id, name: page.name, markup: markup });
        });
      });

      queue.enqueue(() => {
        return this.compileCSS(page.root).then(
          (css) => css.forEach((style) => styles.add(style))
        );
      });

      queue.enqueue(() => {
        return this.compileTemplates(page.root).then((pageTemplates) => {
          this.mergeTemplates(templates, pageTemplates);
        });
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

      return { services, pages, css, templates };
    });
  }

  decompile(compiledApplication: ICompiledAngularApplication) {
    return null;
  }

  private compileMarkup(control: Control): Promise<string> {
    let controlCompiler = <AngularControlCompiler<Control>>
      VISUAL_CONTROL_COMPILERS.get(control.constructor);

    return controlCompiler.compile(control).then((markup) => {
      return Promise.all(
        control.getChildren().map((child) => this.compileMarkup(child))
      ).then((childrenMarkup) => {
        return markup.trim().replace(
          '{children}',
          childrenMarkup.map((childMarkup) => childMarkup.trim()).join('')
        );
      });
    });
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

  private compileTemplates(control: Control): Promise<Map<string, string[]>> {
    let isTemplateHost = typeof control['getTemplate'] === 'function';

    let templatePromise = isTemplateHost ?
      this.compileMarkup(<Control>control['getTemplate']()) :
      Promise.resolve<string>(null);

    return Promise.all(
      control.getChildren().map((child) => this.compileTemplates(child))
    ).then((childrenTemplates) => {
      return templatePromise.then((template) => {
        let templates = new Map<string, string[]>();

        childrenTemplates.forEach(
          (childTemplates) => this.mergeTemplates(templates, childTemplates)
        );

        if (template) {
          if (templates.has(control.meta.type)) {
            templates.get(control.meta.type).push(template);
          } else {
            templates.set(control.meta.type, [template]);
          }
        }

        return templates;
      });
    });
  }

  private mergeTemplates(
    left: Map<string, string[]>, right: Map<string, string[]>
  ) {
    right.forEach((rightTemplates, key) => {
      if (left.has(key)) {
        left.get(key).push(...rightTemplates);
      } else {
        left.set(key, rightTemplates);
      }
    });

    return left;
  }
}
