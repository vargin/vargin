import { Control } from 'core/controls/control';

export class ApplicationPage {
  private _id: string;
  private _name: string;
  private _root: Control;
  private _serviceRoot: Control;

  constructor(id: string, name: string, root: Control, serviceRoot: Control) {
    this._id = id;
    this._name = name;
    this._root = root;
    this._serviceRoot = serviceRoot;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get root() {
    return this._root;
  }

  get serviceRoot() {
    return this._serviceRoot;
  }
}
