import { Application } from 'core/application';
import { ApplicationPage } from 'core/application-page';
import { IProperty } from 'core/property';

import { Control } from 'core/controls/control';
import { VisualControl } from 'core/controls/visual/visual-control';
import {
  VisualControlMetadata
} from 'core/controls/visual/visual-control-metadata';

import { ControlService } from 'services/control-service';

import { IApplicationCompiler } from 'compilers/application-compiler';
import { IControlCompiler } from 'compilers/control-compiler';

interface IPlainControl {
  type: string;
  id?: string;
  children?: IPlainControl[];
  parameters?: {
    properties?: Iterable<[string, string]>;
    styles?: Iterable<[string, string]>;
  };
}

interface IPlainApplication {
  id: string;
  name: string;
  description: string;
  pages: Array<{
    id: string;
    name: string;
    root: IPlainControl;
  }>
}

class JsonControlCompiler implements IControlCompiler<IPlainControl> {
  compile(control: Control) {
    var parameters = {
      properties: [],
      styles: []
    };

    control.meta.supportedProperties.forEach((property, propertyKey) => {
      parameters.properties.push([propertyKey, control[propertyKey].getValue()]);
    });

    if (VisualControl.isVisualControl(control)) {
      let visualControl = <VisualControl>control;

      (<VisualControlMetadata>visualControl.meta).supportedStyles.forEach(
        (style, styleKey) => {
          parameters.styles.push(
            [styleKey, visualControl.styles.get(styleKey).getValue()]
          );
        }
      );
    }

    return {
      id: control.id,
      type: control.meta.type,
      children: control.getChildren().map((child) => this.compile(child)),
      parameters: parameters
    };
  }

  decompile(compiledControl: IPlainControl) {
    var parameters = {
      properties: null,
      styles: null,
      events: null
    };

    var controlParameters = compiledControl.parameters;
    if (controlParameters) {
      if (controlParameters.properties) {
        parameters.properties = new Map(controlParameters.properties);
      }

      if (controlParameters.styles) {
        parameters.styles = new Map(controlParameters.styles);
      }
    }

    var control = ControlService.createByType<Control>(
      compiledControl.type, parameters, compiledControl.id
    );

    if (compiledControl.children && compiledControl.children.length) {
      compiledControl.children.forEach(
        (child) => control.addChild(this.decompile(child))
      );
    }

    return control;
  }
}

export class JsonApplicationCompiler implements IApplicationCompiler<string> {
  private _controlCompiler: JsonControlCompiler = new JsonControlCompiler();

  compile(application: Application) {
    var plainApplicationObject = {
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
    var plainApplicationObject = <IPlainApplication>JSON.parse(
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