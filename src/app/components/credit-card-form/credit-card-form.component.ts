import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

// Imports forms
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CreditCard } from 'src/app/interfaces/credit-card.interface';
import { CreditCardService } from '../../services/credit-card.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-credit-card-form',
  templateUrl: './credit-card-form.component.html',
  styleUrls: ['./credit-card-form.component.css']
})
export class CreditCardFormComponent implements OnInit {

  private creditCards: CreditCard[];
  @Output() private creditCardsEmitter: EventEmitter<CreditCard[]> = new EventEmitter();
  public formCreditCard: FormGroup;
  public loading: boolean = false;
  @Output() loadingEmitter: EventEmitter<boolean> = new EventEmitter();
  @Input() private id: number | undefined;
  @Input() public action: string;
  @Output() private formCreditCardEmitter: EventEmitter<FormGroup> = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private creditCardService: CreditCardService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.action = 'Agregar';
    this.formCreditCardEmitter.emit(this.formCreditCard);
  }

  private createForm() {
    this.formCreditCard = this.formBuilder.group({
      titular: ['', [
        Validators.required,
        Validators.pattern('[A-Za-zá-úÁ-Ú ]*')
      ]],
      numeroTarjeta: ['', [
        Validators.required,
        Validators.pattern('^[0-9]+'),
        Validators.maxLength(16),
        Validators.minLength(16)
      ]],
      fechaExpiracion: ['', [
        Validators.required,
        Validators.maxLength(5),
        Validators.minLength(5)
      ]],
      cvv: ['', [
        Validators.required,
        Validators.pattern('^[0-9]+'),
        Validators.maxLength(3),
        Validators.minLength(3)
      ]]
    });
  }

  public get f() {
    return this.formCreditCard.controls;
  }

  public get getTitular(): boolean {
    return this.formCreditCard.get('titular').invalid && this.formCreditCard.get('titular').touched;
  }

  public get getNumeroTarjeta(): boolean {
    return this.formCreditCard.get('numeroTarjeta').invalid && this.formCreditCard.get('numeroTarjeta').touched;
  }

  public get getFechaExpiracion(): boolean {
    return this.formCreditCard.get('fechaExpiracion').invalid && this.formCreditCard.get('fechaExpiracion').touched;
  }

  public get getCvv(): boolean {
    return this.formCreditCard.get('cvv').invalid && this.formCreditCard.get('cvv').touched;
  }

  private createCreditCard(): CreditCard {
    const creditCard: CreditCard = {
      titular: this.formCreditCard.get('titular').value,
      numeroTarjeta: this.formCreditCard.get('numeroTarjeta').value,
      fechaExpiracion: this.formCreditCard.get('fechaExpiracion').value,
      cvv: this.formCreditCard.get('cvv').value
    }
    return creditCard;
  }

  public saveCreditCard(): void {
    if (this.formCreditCard.invalid) {
      Object.values(this.f)
        .forEach(control => {
          control.markAllAsTouched();
        });
    }
    else {
      console.log(this.id);
      console.log(this.action);

      this.loading = true;
      this.loadingEmitter.emit(this.loading);
      let creditCard = this.createCreditCard();

      if (this.id === undefined) {
        // Agregar tarjeta
        this.creditCardService.saveCreditCard(creditCard)
          .pipe(first())
          .subscribe((response: CreditCard) => {
            if (response) {
              this.toastrService.success('La tarjeta fue registrada con éxito', 'Tarjeta registrada!');
            }
            this.formCreditCard.reset();
            this.getCreditCards();
            this.loading = false;
            this.loadingEmitter.emit(this.loading);
          }, (error) => {
            this.toastrService.error('Ha ocurrido un error al guardar la tajeta!', 'Error!');
            console.error(error);
            this.loading = false;
            this.loadingEmitter.emit(this.loading);
          });
      } else {
        // Editar tarjeta
        creditCard['id'] = this.id;
        this.creditCardService.updateCreditCard(this.id, creditCard)
          .pipe(first())
          .subscribe((response: any) => {
            if (response.message) {
              this.toastrService.info(response.message, 'Tarjeta actualizada!');
              this.formCreditCard.reset();
              this.getCreditCards();
              this.action = 'Agregar';
              this.id = undefined;
              this.loading = false;
              this.loadingEmitter.emit(this.loading);
            }
          }, (error) => {
            this.toastrService.error('Ha ocurrido un error al editar la tajeta!', 'Error!');
            console.error(error);
            this.loading = false;
            this.loadingEmitter.emit(this.loading);
          });
      }
    }
  }

  private getCreditCards(): void {
    this.creditCardService.getCreditCards()
      .pipe(first())
      .subscribe((response: CreditCard[]) => {
        this.creditCards = response;
        this.creditCardsEmitter.emit(this.creditCards);
      }, (error) => {
        console.error(error);
      });
  }

}
