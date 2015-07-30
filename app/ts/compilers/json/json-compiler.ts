import { Application } from 'core/application';
import { ApplicationPage } from 'core/application-page';
import { IProperty } from 'core/property';

import { Control } from 'core/controls/control';
import { VisualControl } from 'core/controls/visual/visual-control';
import {
  VisualControlMetadata
} from 'core/controls/visual/visual-control-metadata';

import { ControlService } from 'services/control-service';

import { ICompiler } from 'compilers/compiler';

interface IPlainControlParameters {
  properties?: Iterable<[string, string]>;
  styles?: Iterable<[string, string]>;
}

interface IPlainControl {
  type: string;
  id?: string;
  parameters?: IPlainControlParameters;
  children?: IPlainControl[]
}

interface IPlainApplicationPage {
  id: string;
  name: string;
  root: IPlainControl;
}

interface IPlainApplication {
  id: string;
  name: string;
  description: string;
  pages: IPlainApplicationPage[]
}

function dehydrateControl(control: Control) {
  var parameters = {
    properties: [],
    styles: []
  };

  control.meta.supportedProperties.forEach((property, propertyKey) => {
    parameters.properties.push([propertyKey, control[propertyKey].getValue()]);
  });

  if ('styles' in control) {
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
    children: control.children.map((child) => dehydrateControl(child)),
    parameters: parameters
  };
}

function hydrateControl(dehydratedControl: IPlainControl)  {
  var parameters = {
    properties: null,
    styles: null,
    events: null
  };

  var controlParameters = dehydratedControl.parameters;
  if (controlParameters) {
    if (controlParameters.properties) {
      parameters.properties = new Map(controlParameters.properties);
    }

    if (controlParameters.styles) {
      parameters.styles = new Map(controlParameters.styles);
    }
  }

  var children;
  if (dehydratedControl.children && dehydratedControl.children.length) {
    children = dehydratedControl.children.map(hydrateControl);
  }

  return ControlService.createByType<Control>(
    dehydratedControl.type,
    parameters,
    dehydratedControl.id,
    children
  );
}

export class JsonCompiler implements ICompiler<string> {
  compile(application: Application) {
    var plainApplicationObject = {
      id: application.id,
      name: application.name,
      description: application.description,
      pages: application.pages.map((page) => {
        return {
          id: page.id,
          name: page.name,
          root: dehydrateControl(page.root)
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
          hydrateControl(plainApplicationPage.root)
        );
      })
    );
  }
}