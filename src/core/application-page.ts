import { Control } from './controls/control';

export class ApplicationPage {
  private _id: string;
  private _name: string;
  private _root: Control;

  constructor(id: string, name: string, root: Control) {
    this._id = id;
    this._name = name;
    this._root = root;
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
}
