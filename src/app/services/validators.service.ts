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

  public validateOptionZero(control: FormControl): ErrorValidate {
    if (control.value.toLowerCase() === '0') {
      return {
        optionZero: true
      }
    } else {
      return null;
    }
  }
}
