import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isFalsy',
})
export class IsFalsyPipe implements PipeTransform {
  transform(value: string): boolean {
    return value ? false : true;
  }
}
