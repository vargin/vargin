/// <reference path="../../../typings/tsd.d.ts" />

export interface IControlStateOverrides {
  properties?: Map<string, string>;
}

/**
 * Represents control state with properties, styles and events that correspond
 * to specific state.
 * @class
 */
export class ControlState {
  /**
   * Control state name.
   * @type {string}
   */
  public name: string;

  /**
   * Indicates that current state is enabled.
   * @type {Boolean}
   */
  public isEnabled: boolean;

  /**
   * Represents control parameters that are overridden by the state.
   * @type {IControlStateOverrides}
   */
  public overrides: IControlStateOverrides;

  constructor(
    name: string,
    overrides?: IControlStateOverrides,
    isEnabled?: boolean
  ) {
    this.name = name;
    this.overrides = overrides || {};

    if (!this.overrides.properties) {
      this.overrides.properties = new Map<string, string>();
    }

    this.isEnabled = !!isEnabled;
  }

  /**
   * Checks if ControlState has any overrides defined.
   * @returns {boolean}
   */
  hasOverrides() {
    return this.overrides.properties.size > 0;
  }
}
