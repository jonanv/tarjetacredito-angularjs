import { Component, OnInit } from '@angular/core';

// Imports
import { CreditCard } from 'src/app/interfaces/credit-card.interface';
import { CreditCardService } from '../../services/credit-card.service';
import { first } from "rxjs/operators";

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.css']
})
export class CreditCardComponent implements OnInit {

  public creditCards: CreditCard[] = [];

  constructor(
    private creditCardService: CreditCardService
  ) { }

  ngOnInit(): void {
    this.getCreditCards();
  }

  private getCreditCards() {
    this.creditCardService.getCreditCards()
      .pipe(first())
      .subscribe((response: CreditCard[]) => {
        this.creditCards = response;
      }, (error) => {
        console.error(error);
      });
  }

}
