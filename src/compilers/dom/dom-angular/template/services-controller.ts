/// <reference path="../../../../../typings/tsd.d.ts" />
import { Inject } from 'angular2/angular2';
import { IServiceDescription, services } from 'app-description';

// Parse services
// 1. Datasources

export class Datasource {
  items: Map<string, string>[];

  constructor(items: Map<string, string>[]) {
    this.items = items;
  }
}


export class ServicesController {
  static getDatasource(id): Datasource {
    let serializedDatasource = services.find(
      (serviceDescription: IServiceDescription) => {
        return serviceDescription.type === 'datasource' &&
          serviceDescription.id === id;
      }
    );

    let properties = new Map(serializedDatasource.parameters.properties);

    return new Datasource(
      JSON.parse(properties.get('items')).map(
        (propertyMap: [string, string][]) => new Map(propertyMap)
      )
    );
  }
}
