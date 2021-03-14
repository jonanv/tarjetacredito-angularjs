import { Component, OnInit } from '@angular/core';

// Imports
import { CreditCard } from 'src/app/interfaces/credit-card.interface';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.css']
})
export class CreditCardComponent implements OnInit {

  public creditCards: CreditCard[] = [
    {
      name: 'Juan Perez',
      cardNumber: '432424344',
      dateExpiration: '11/23',
      cvv: '123'
    },
    {
      name: 'Juan Perez',
      cardNumber: '432424344',
      dateExpiration: '11/23',
      cvv: '123'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
