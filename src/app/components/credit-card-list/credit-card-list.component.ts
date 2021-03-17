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

  @Input() public creditCards: CreditCard[];
  @Output() private actionEmitter: EventEmitter<string> = new EventEmitter();
  @Output() private idEmitter: EventEmitter<number> = new EventEmitter();
  @Input() private formCreditCard: FormGroup;
  @Input() public loading: boolean;

  constructor(
    private toastrService: ToastrService,
    private creditCardService: CreditCardService
  ) { }

  ngOnInit(): void {
    this.getCreditCards();
  }

  // TODO: Revisar el metodo getCreditCards para que se llame desde un solo lado
  private getCreditCards(): void {
    this.loading = true;
    this.creditCardService.getCreditCards()
      .pipe(first())
      .subscribe((response: CreditCard[]) => {
        this.creditCards = response;
        this.loading = false;
      }, (error) => {
        console.error(error);
        this.loading = false;
      });
  }

  public removeCreditCard(index: number): void {
    // TODO: Agregar una confirmacion al boton
    this.loading = true;
    this.creditCardService.deleteCreditCard(index)
      .pipe(first())
      .subscribe((response: any) => {
        if (response.message) {
          this.toastrService.error(response.message, 'Tarjeta eliminada!');
          this.getCreditCards();
          this.formCreditCard.reset();
          this.actionEmitter.emit('Agregar');
          this.loading = false;
        }
      }, (error) => {
        console.error(error);
        this.loading = false;
      });
  }

  public updateCreditCard(creditCard: CreditCard): void {
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
