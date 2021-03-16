import { Component, OnInit } from '@angular/core';

// Imports
import { CreditCard } from '../../interfaces/credit-card.interface';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.css']
})
export class CreditCardComponent implements OnInit {

  public creditCards: CreditCard[];
  public action: string;
  public id: number | undefined;
  public formCreditCard: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

  public processCreditCardsEmitter(creditCards: CreditCard[]): void {
    this.creditCards = creditCards;
  }

  public processActionEmitter(action: string): void {
    this.action = action;
  }

  public processIdEmitter(id: number): void {
    this.id = id;
  }

  public processFormCreditCardEmitter(formCreditCard: FormGroup): void {
    this.formCreditCard = formCreditCard;
  }

}
