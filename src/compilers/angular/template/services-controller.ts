import {
  IJSONControl,
  JSONControlCompiler
} from '../../json/json-control-compiler';
import { Control } from '../../../core/controls/control';
import { services } from './app-description';

// Parse services
// 1. Datasources

export class Datasource {
  items: Map<string, string>[];

  constructor(items: Map<string, string>[]) {
    this.items = items;
  }
}

const jsonControlCompiler = new JSONControlCompiler();

export class ServicesController {
  static datasources = new Map<string, Datasource>();

  static init() {
    let serializedDatasources = services.filter(
      (service: IJSONControl) => service.type === 'datasource'
    );

    return Promise.all(
      serializedDatasources.map((serializedDatasource) => {
        return jsonControlCompiler.decompile(serializedDatasource).then(
          (control: Control) => {
            let itemsJSON = control.getProperty('items').getValue();

            let items = itemsJSON ? JSON.parse(itemsJSON).map(
              (propertyMap: [string, string][]) => new Map(propertyMap)
            ) : [];

            ServicesController.datasources.set(
              serializedDatasource.id, new Datasource(items)
            );
          }
        );
      })
    );
  }
}
