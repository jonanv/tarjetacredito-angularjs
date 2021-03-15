import { Component, OnInit } from '@angular/core';

// Imports
import { ToastrService } from 'ngx-toastr';
import { CreditCard } from '../../interfaces/credit-card.interface';
import { CreditCardService } from '../../services/credit-card.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-credit-card-list',
  templateUrl: './credit-card-list.component.html',
  styleUrls: ['./credit-card-list.component.css']
})
export class CreditCardListComponent implements OnInit {

  public creditCards: CreditCard[] = [];

  constructor(
    private toastrService: ToastrService,
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

  public removeCreditCard(index: number) {
    this.creditCardService.deleteCreditCard(index)
      .pipe(first())
      .subscribe((response) => {
        if (response.message) {
          this.toastrService.error(response.message, 'Tarjeta eliminada!');
          this.getCreditCards();
        }
      }, (error) => {
        console.error(error);
      });
  }

}
