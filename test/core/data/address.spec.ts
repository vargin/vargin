/// <reference path="../../../typings/tsd.d.ts" />
import { it, describe, expect } from 'angular2/testing';
import { Address, AddressType } from '../../../src/core/data/address';

describe('core/data/address', () => {
  it('constructor()', function () {
    let defaultAddress = new Address(),
        emptyPageAddress = new Address(AddressType.APP_PAGE),
        fullEmailAddress = new Address(AddressType.EMAIL, 'test@test.com');

    expect(defaultAddress.type).toEqual(AddressType.URL);
    expect(defaultAddress.value).toEqual('');

    expect(emptyPageAddress.type).toEqual(AddressType.APP_PAGE);
    expect(emptyPageAddress.value).toEqual('');

    expect(fullEmailAddress.type).toEqual(AddressType.EMAIL);
    expect(fullEmailAddress.value).toEqual('test@test.com');
  });

  it('serialize()', () => {
    let defaultAddress = new Address(),
        emptyPageAddress = new Address(AddressType.APP_PAGE),
        fullEmailAddress = new Address(AddressType.EMAIL, 'test@test.com');

    expect(Address.serialize(defaultAddress)).toEqual('0:');
    expect(Address.serialize(emptyPageAddress)).toEqual('1:');
    expect(Address.serialize(fullEmailAddress)).toEqual('2:test@test.com');
  });

  it('deserialize()', () => {
    let defaultAddress = Address.deserialize('0:'),
        emptyPageAddress = Address.deserialize('1:'),
        fullEmailAddress = Address.deserialize('2:test@test.com'),
        fullURLAddress = Address.deserialize('0:http://vargin.com');

    expect(defaultAddress.type).toEqual(AddressType.URL);
    expect(defaultAddress.value).toEqual('');

    expect(emptyPageAddress.type).toEqual(AddressType.APP_PAGE);
    expect(emptyPageAddress.value).toEqual('');

    expect(fullEmailAddress.type).toEqual(AddressType.EMAIL);
    expect(fullEmailAddress.value).toEqual('test@test.com');

    expect(fullURLAddress.type).toEqual(AddressType.URL);
    expect(fullURLAddress.value).toEqual('http://vargin.com');
  });
});
