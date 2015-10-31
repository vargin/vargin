export const application = '';

export const pages = <Array<{ id: string; name: string; markup: string }>>[];

export interface IServiceEventDescription {
  type: string;
  properties: [string, string][];
}

export interface IServiceDescription {
  type: string;
  id: string;
  parameters?: {
    properties?: [string, string][];
    events?: [string, IServiceEventDescription[]][];
  };
}

export const services: IServiceDescription[] = null;
