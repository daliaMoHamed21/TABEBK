import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gender'
})
export class GenderPipe implements PipeTransform {

  transform(value:number): string {
    return value === 0?"Male":value === 1?"Female":value ===2?"Prefer not to say":"unknown";
  }

}
