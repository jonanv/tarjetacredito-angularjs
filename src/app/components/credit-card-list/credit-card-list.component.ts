import { Component, Input, OnInit } from '@angular/core';

// Imports
import { ToastrService } from 'ngx-toastr';
import { CreditCard } from '../../interfaces/credit-card.interface';

@Component({
  selector: 'app-credit-card-list',
  templateUrl: './credit-card-list.component.html',
  styleUrls: ['./credit-card-list.component.css']
})
export class CreditCardListComponent implements OnInit {

  @Input() creditCards: CreditCard[];

  constructor(
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
  }

  public removeCreditCard(index: number) {
    this.creditCards.splice(index, 1);
    this.toastrService.error('La tarjeta fue eliminada con éxito', 'Tarjeta eliminada!');
  }

}
