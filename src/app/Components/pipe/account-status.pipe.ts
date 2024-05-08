import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'accountStatus'
})
export class AccountStatusPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return value == 0 ? "Active" : value == 1 ? "Inactive" : value == 2 ? "Banned" : value == 3 ? "Rejected" : "Error";
  }

}
