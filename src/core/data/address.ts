export enum AddressType {
  URL,
  APP_PAGE,
  EMAIL,
  PHONE
}

export class Address {
  type: AddressType;
  value: string;

  constructor(type: AddressType = AddressType.URL, value: string = '') {
    this.type = type;
    this.value = value;
  }

  static serialize(address: Address): string {
    return `${address.type}:${address.value}`;
  }

  static deserialize(addressString: string): Address {
    // Schema is {type}:{value}
    return new Address(+addressString[0], addressString.substring(2));
  }
}
