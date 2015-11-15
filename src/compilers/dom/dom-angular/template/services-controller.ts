import { Inject } from 'angular2/angular2';
import {
  IJSONControl,
  JSONControlCompiler
} from '../../../json/json-control-compiler';
import { Control } from '../../../../core/controls/control';
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
  private static cache = new Map<string, Datasource>();

  static getDatasource(id) {
    let cachedDatasource = ServicesController.cache.get(id);

    if (!cachedDatasource) {
      cachedDatasource = new Datasource([]);
      ServicesController.cache.set(id, cachedDatasource);

      let serializedDatasource = services.find(
        (service: IJSONControl) => {
          return service.type === 'datasource' &&
            service.id === id;
        }
      );

      return jsonControlCompiler.decompile(serializedDatasource).then(
        (control: Control) => {
          let itemsJSON = control.getProperty('items').getValue();
          if (itemsJSON) {
            JSON.parse(itemsJSON).forEach((propertyMap: [string, string][]) => {
              cachedDatasource.items.push(new Map(propertyMap));
            });
          }
        }
      );
    }

    return cachedDatasource;
  }
}
