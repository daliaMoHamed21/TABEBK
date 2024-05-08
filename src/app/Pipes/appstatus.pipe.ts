import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appstatus'
})
export class AppstatusPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return value === 0 ? "Accepted" : value === 1 ? "Rejected" : value === 2 ? "Canceled" : "Pending";
  }

}
