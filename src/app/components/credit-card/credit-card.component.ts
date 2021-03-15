import { Component, OnInit } from '@angular/core';

// Imports
import { CreditCard } from '../../interfaces/credit-card.interface';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.css']
})
export class CreditCardComponent implements OnInit {

  public creditCards: CreditCard[];

  constructor() { }

  ngOnInit(): void {
  }

  public processCreditCardsEmitter(creditCards: CreditCard[]): void {
    this.creditCards = creditCards;
  }

}
