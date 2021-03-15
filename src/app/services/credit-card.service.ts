import { Injectable } from '@angular/core';

// Imports
import { HttpClient } from '@angular/common/http';
import { CreditCard } from '../interfaces/credit-card.interface';
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {

  private url: string = 'https://localhost:5001/';
  private api: string = 'api/tarjeta/';

  constructor(
    private http: HttpClient
  ) { }

  getCreditCards(): Observable<any> {
    return this.http.get(this.url + this.api)
      .pipe(map((response: CreditCard[]) => {
        return response;
      }));
  }

  deleteCreditCard(id: number): Observable<any> {
    return this.http.delete(this.url + this.api +  id)
      .pipe(map((response) => {
        return response;
      }));
  }
}
