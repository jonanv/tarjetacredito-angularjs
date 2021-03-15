import { Component, Input, OnInit } from '@angular/core';

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

  @Input() creditCards: CreditCard[];

  constructor(
    private toastrService: ToastrService,
    private creditCardService: CreditCardService
  ) { }

  ngOnInit(): void {
    this.getCreditCards();
  }

  // TODO: Revisar el metodo getCreditCards para que se llame desde un solo lado
  private getCreditCards(): void {
    this.creditCardService.getCreditCards()
      .pipe(first())
      .subscribe((response: CreditCard[]) => {
        this.creditCards = response;
      }, (error) => {
        console.error(error);
      });
  }

  public removeCreditCard(index: number): void {
    this.creditCardService.deleteCreditCard(index)
      .pipe(first())
      .subscribe((response: any) => {
        if (response.message) {
          this.toastrService.error(response.message, 'Tarjeta eliminada!');
          this.getCreditCards();
        }
      }, (error) => {
        console.error(error);
      });
  }

}
