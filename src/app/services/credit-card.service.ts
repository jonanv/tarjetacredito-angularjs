import { Injectable } from '@angular/core';

// Imports
import { HttpClient } from '@angular/common/http';
import { CreditCard } from '../interfaces/credit-card.interface';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {

  private url: string = 'https://localhost:5001/';
  private api: string = 'api/tarjeta/';

  constructor(
    private http: HttpClient
  ) { }

  private getQuery() {
    const url: string = `${ this.url }${ this.api }`;
    return this.http.get(url);
  }

  getCreditCards() {
    return this.getQuery()
      .pipe(map((response: CreditCard[]) => {
        return response;
      }));
  }
}
