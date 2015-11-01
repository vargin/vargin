export enum StringFormatType {
  PlainText,
  Number,
  Percent,
  Currency,
  ShortTime,
  ShortDate
}

export class StringFormatter {
  static format(
    stringToFormat: string,
    type: StringFormatType = StringFormatType.PlainText
  ) {
    if (typeof stringToFormat !== 'string') {
      throw new Error(
        'Formatter supports only "string" type. "' +
        typeof stringToFormat +
        '" type is not supported!'
      );
    }

    if (!stringToFormat) {
      return stringToFormat;
    }

    if (type === StringFormatType.Number) {
      return (new Intl.NumberFormat('en-US')).format(+stringToFormat);
    }

    if (type === StringFormatType.Percent) {
      return (new Intl.NumberFormat('en-US', { style: 'percent' })).format(
        +stringToFormat
      );
    }

    if (type === StringFormatType.Currency) {
      let currencyOptions = { style: 'currency', currency: 'EUR' };
      return (new Intl.NumberFormat('en-US', currencyOptions)).format(
        +stringToFormat
      );
    }

    if (type === StringFormatType.ShortTime) {
      let timeOptions = { hour: 'numeric', minute: 'numeric' };
      return (new Intl.DateTimeFormat('en-US', timeOptions)).format(
        +stringToFormat
      );
    }

    if (type === StringFormatType.ShortDate) {
      return (new Intl.DateTimeFormat('en-US')).format(+stringToFormat);
    }

    return stringToFormat;
  }

  /**
   * Provides Angular Pipe expression for the specified string type.
   * @param {StringFormatType} format Format to find angular type for.
   * @returns {string} Angular Pipe expression.
   */
  static toPipe(format: StringFormatType) {
    switch (format) {
      case StringFormatType.Number:
        return 'number';
      case StringFormatType.Currency:
        return 'currency:\'EUR\':true';
      case StringFormatType.Percent:
        return 'percent';
      case StringFormatType.ShortTime:
        return 'date:\'shortTime\'';
      case StringFormatType.ShortDate:
        return 'date:\'shortDate\'';
      default:
        return null;
    }
  }
}
