import { it, describe, expect } from 'angular2/testing';
import {
  StringFormatter,
  StringFormatType
} from '../../../src/core/tools/string-formatter';

describe('core/tools/string-formatter', () => {
  it('format(invalid type)', function () {
    expect(() => StringFormatter.format(null)).toThrowErrorWith(
      'Formatter supports only "string" type. "object" type is not supported!'
    );
  });

  it('format(string, default type)', function() {
    expect(StringFormatter.format('')).toEqual('');
    expect(StringFormatter.format('-1')).toEqual('-1');
    expect(StringFormatter.format('0')).toEqual('0');
    expect(StringFormatter.format('0.01')).toEqual('0.01');
    expect(StringFormatter.format('1')).toEqual('1');
    expect(StringFormatter.format('5500.5')).toEqual('5500.5');
    expect(StringFormatter.format('1444077964487')).toEqual('1444077964487');
    expect(StringFormatter.format('text')).toEqual('text');
  });

  it('format(string, PlainText)', function() {
    expect(StringFormatter.format('', StringFormatType.PlainText)).toEqual('');
    expect(StringFormatter.format('-1', StringFormatType.PlainText)).toEqual(
      '-1'
    );
    expect(StringFormatter.format('0', StringFormatType.PlainText)).toEqual(
      '0'
    );
    expect(StringFormatter.format('0.01', StringFormatType.PlainText)).toEqual(
      '0.01'
    );
    expect(StringFormatter.format('1', StringFormatType.PlainText)).toEqual(
      '1'
    );
    expect(
      StringFormatter.format('5500.5', StringFormatType.PlainText)
    ).toEqual('5500.5');
    expect(
      StringFormatter.format('1444077964487', StringFormatType.PlainText)
    ).toEqual('1444077964487');
    expect(StringFormatter.format('text', StringFormatType.PlainText)).toEqual(
      'text'
    );
  });

  it('format(string, Number)', function() {
    expect(StringFormatter.format('', StringFormatType.Number)).toEqual('');
    expect(StringFormatter.format('-1', StringFormatType.Number)).toEqual(
      '-1'
    );
    expect(StringFormatter.format('0', StringFormatType.Number)).toEqual(
      '0'
    );
    expect(StringFormatter.format('0.01', StringFormatType.Number)).toEqual(
      '0.01'
    );
    expect(StringFormatter.format('1', StringFormatType.Number)).toEqual(
      '1'
    );
    expect(
      StringFormatter.format('5500.5', StringFormatType.Number)
    ).toEqual('5,500.5');
    expect(
      StringFormatter.format('1444077964487', StringFormatType.Number)
    ).toEqual('1,444,077,964,487');
    expect(StringFormatter.format('text', StringFormatType.Number)).toEqual(
      'NaN'
    );
  });

  it('format(string, Percent)', function() {
    expect(StringFormatter.format('', StringFormatType.Percent)).toEqual('');
    expect(StringFormatter.format('-1', StringFormatType.Percent)).toEqual(
      '-100.0%'
    );
    expect(StringFormatter.format('0', StringFormatType.Percent)).toEqual(
      '0.0%'
    );
    expect(StringFormatter.format('0.01', StringFormatType.Percent)).toEqual(
      '1.0%'
    );
    expect(StringFormatter.format('1', StringFormatType.Percent)).toEqual(
      '100.0%'
    );
    expect(StringFormatter.format('5500.5', StringFormatType.Percent)).toEqual(
      '550,050.0%'
    );
    expect(
      StringFormatter.format('1444077964487', StringFormatType.Percent)
    ).toEqual('144,407,796,448,700.0%');
    expect(StringFormatter.format('text', StringFormatType.Percent)).toEqual(
      'NaN'
    );
  });

  it('format(string, Currency)', function() {
    expect(StringFormatter.format('', StringFormatType.Currency)).toEqual('');
    expect(StringFormatter.format('-1', StringFormatType.Currency)).toEqual(
      '-€1.00'
    );
    expect(StringFormatter.format('0', StringFormatType.Currency)).toEqual(
      '€0.00'
    );
    expect(StringFormatter.format('0.01', StringFormatType.Currency)).toEqual(
      '€0.01'
    );
    expect(StringFormatter.format('1', StringFormatType.Currency)).toEqual(
      '€1.00'
    );
    expect(StringFormatter.format('5500.5', StringFormatType.Currency)).toEqual(
      '€5,500.50'
    );
    expect(
      StringFormatter.format('1444077964487', StringFormatType.Currency)
    ).toEqual('€1,444,077,964,487.00');
    expect(StringFormatter.format('text', StringFormatType.Currency)).toEqual(
      'NaN'
    );
  });

  it('format(string, ShortTime)', function() {
    expect(StringFormatter.format('', StringFormatType.ShortTime)).toEqual('');
    expect(StringFormatter.format('-1', StringFormatType.ShortTime)).toEqual(
      '12:59 AM'
    );
    expect(StringFormatter.format('0', StringFormatType.ShortTime)).toEqual(
      '1:00 AM'
    );
    expect(StringFormatter.format('0.01', StringFormatType.ShortTime)).toEqual(
      '1:00 AM'
    );
    expect(StringFormatter.format('1', StringFormatType.ShortTime)).toEqual(
      '1:00 AM'
    );
    expect(
      StringFormatter.format('5500.5', StringFormatType.ShortTime)
    ).toEqual('1:00 AM');
    expect(
      StringFormatter.format('1444077964487', StringFormatType.ShortTime)
    ).toEqual('10:46 PM');
    expect(
      StringFormatter.format(
        Date.UTC(2015, 11, 1, 15, 20, 0).toString(), StringFormatType.ShortTime
      )
    ).toEqual('4:20 PM');
    expect(
      StringFormatter.format(
        Date.UTC(2015, 11, 1, 9, 35, 30).toString(), StringFormatType.ShortTime
      )
    ).toEqual('10:35 AM');
    expect(
      () => StringFormatter.format('text', StringFormatType.ShortTime)
    ).toThrow();
  });

  it('format(string, ShortDate)', function() {
    expect(StringFormatter.format('', StringFormatType.ShortDate)).toEqual('');
    expect(StringFormatter.format('-1', StringFormatType.ShortDate)).toEqual(
      '1/1/1970'
    );
    expect(StringFormatter.format('0', StringFormatType.ShortDate)).toEqual(
      '1/1/1970'
    );
    expect(StringFormatter.format('0.01', StringFormatType.ShortDate)).toEqual(
      '1/1/1970'
    );
    expect(StringFormatter.format('1', StringFormatType.ShortDate)).toEqual(
      '1/1/1970'
    );
    expect(
      StringFormatter.format('5500.5', StringFormatType.ShortDate)
    ).toEqual('1/1/1970');
    expect(
      StringFormatter.format('1444077964487', StringFormatType.ShortDate)
    ).toEqual('10/5/2015');
    expect(
      StringFormatter.format(
        Date.UTC(2015, 10, 1, 15, 20, 0).toString(), StringFormatType.ShortDate
      )
    ).toEqual('11/1/2015');
    expect(
      StringFormatter.format(
        Date.UTC(2014, 8, 4, 9, 35, 30).toString(), StringFormatType.ShortDate
      )
    ).toEqual('9/4/2014');
    expect(
      () => StringFormatter.format('text', StringFormatType.ShortDate)
    ).toThrow();
  });

  it('toPipe(format)', function() {
    expect(StringFormatter.toPipe(StringFormatType.PlainText)).toBeNull();
    expect(StringFormatter.toPipe(100)).toBeNull();
    expect(StringFormatter.toPipe(StringFormatType.Number)).toEqual('number');
    expect(StringFormatter.toPipe(StringFormatType.Percent)).toEqual('percent');
    expect(StringFormatter.toPipe(StringFormatType.Currency)).toEqual(
      'currency:\'EUR\':true'
    );
    expect(StringFormatter.toPipe(StringFormatType.ShortTime)).toEqual(
      'date:\'shortTime\''
    );
    expect(StringFormatter.toPipe(StringFormatType.ShortDate)).toEqual(
      'date:\'shortDate\''
    );
  });
});
