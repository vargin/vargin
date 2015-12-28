import { PipeTransform, Injectable, Pipe } from 'angular2/core';

import { StringFormatter } from '../../../../core/tools/string-formatter';

@Injectable()
@Pipe({ name: 'stringformat' })
export class StringFormatPipe implements PipeTransform {
  transform(value: string, args: string[]): string {
    if (!args || args.length != 1) {
      throw new Error('StringFormat pipe requires one argument');
    }

    return StringFormatter.format(value.toString(), +args[0]);
  }
}
