import { Control } from 'core/controls/control';
import { ContainerControl } from 'core/controls/visual/container-control';
import { ApplicationPage } from 'core/application-page';
import { UtilsService } from 'services/utils-service';

export class Application {
  private _id: string;
  private _name: string;
  private _description: string;
  private _serviceRoot: Control;
  private _pages: ApplicationPage[];

  constructor(
    id: string,
    name: string,
    description: string,
    serviceRoot: Control,
    pages: ApplicationPage[] = []
  ) {
    this._id = id;
    this._name = name;
    this._description = description;
    this._serviceRoot = serviceRoot;
    this._pages = pages;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get description() {
    return this._description;
  }

  get serviceRoot() {
    return this._serviceRoot;
  }

  get pages(): ApplicationPage[] {
    return this._pages;
  }

  addPage(name?: string) {
    this.pages.push(
      new ApplicationPage(
        UtilsService.uuid(),
        name || `Page #${this.pages.length}`,
        new ContainerControl(UtilsService.uuid())
      )
    );
  }

  removePage(id: string) {
    this.pages.splice(this.pages.findIndex((page) => page.id === id), 1);
  }
}
