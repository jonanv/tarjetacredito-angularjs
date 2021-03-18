import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

interface ErrorValidate {
  [s: string]: boolean
}

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  constructor() { }

  public validateDateExpiration(control: FormControl): ErrorValidate {
    let date: string[] = control.value.split('');

    let month: string = '';
    let year: string = '';
    let dateActual: Date = new Date();
    console.log(date.indexOf('/'));

    if (date.indexOf('/') !== -1) {
      for (let i = 0; i < 2; i++) {
        month += date[i];
      }
      for (let i = 3; i < date.length; i++) {
        year += date[i];
      }
    } else {
      for (let i = 0; i < 2; i++) {
        month += date[i];
      }
      for (let i = 2; i < date.length; i++) {
        year += date[i];
      }
    }

    console.log(date);
    console.log(month);
    console.log(year);

    if (parseInt(month) < 1 || parseInt(month) > 12 && parseInt(year) <= dateActual.getFullYear()) {
      return {
        dateExpiration: true
      }
    } else {
      return null;
    }
  }
}
