import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'DateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(value, 'yyyy-MM-dd');
  }


}
