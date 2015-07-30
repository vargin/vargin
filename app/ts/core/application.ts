import { ApplicationPage } from 'core/application-page';

export class Application {
  private _id: string;
  private _name: string;
  private _description: string;
  private _pages: ApplicationPage[];

  constructor(id, name, description, pages = []) {
    this._id = id;
    this._name = name;
    this._description = description;
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

  get pages() {
    return this._pages;
  }
}