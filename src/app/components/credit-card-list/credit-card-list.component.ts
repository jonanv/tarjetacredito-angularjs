import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

// Imports
import { ToastrService } from 'ngx-toastr';
import { CreditCard } from '../../interfaces/credit-card.interface';
import { CreditCardService } from '../../services/credit-card.service';
import { first } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-credit-card-list',
  templateUrl: './credit-card-list.component.html',
  styleUrls: ['./credit-card-list.component.css']
})
export class CreditCardListComponent implements OnInit {

  @Input() creditCards: CreditCard[];
  @Output() actionEmitter: EventEmitter<string> = new EventEmitter();
  @Output() idEmitter: EventEmitter<number> = new EventEmitter();
  @Input() formCreditCard: FormGroup;

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
    // TODO: Agregar una confirmacion al boton
    this.creditCardService.deleteCreditCard(index)
      .pipe(first())
      .subscribe((response: any) => {
        if (response.message) {
          this.toastrService.error(response.message, 'Tarjeta eliminada!');
          this.getCreditCards();
          this.formCreditCard.reset();
          this.actionEmitter.emit('Agregar');
        }
      }, (error) => {
        console.error(error);
      });
  }

  public updateCreditCard(creditCard: CreditCard): void {
    console.log(creditCard);
    this.actionEmitter.emit('Id: ' + creditCard['id'] + ' - Editar');
    this.idEmitter.emit(creditCard['id']);
    this.formCreditCard.patchValue({
      titular: creditCard.titular,
      numeroTarjeta: creditCard.numeroTarjeta,
      fechaExpiracion: creditCard.fechaExpiracion,
      cvv: creditCard.cvv
    });
  }

}
