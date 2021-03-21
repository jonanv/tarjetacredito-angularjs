import { Component, OnInit } from '@angular/core';

// Imports
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CreditCard } from 'src/app/interfaces/credit-card.interface';
import { CreditCardService } from '../../services/credit-card.service';
import { first } from 'rxjs/operators';
import Swal from "sweetalert2";
import { ValidatorsService } from '../../services/validators.service';

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.css']
})
export class CreditCardComponent implements OnInit {

  public creditCards: CreditCard[];
  public formCreditCard: FormGroup;
  public loading: boolean = false;
  private id: number | undefined;
  public action: string;
  public changeFaceCard: boolean = false;
  public rotateButton: boolean = false;
  public monthSelector: string[] = [];
  public yearSelector: string[] = [];
  private yearActual: number = new Date().getFullYear();

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private creditCardService: CreditCardService,
    private validatorsService: ValidatorsService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getCreditCards();
    this.action = 'Agregar';
    this.fillSelectors();
  }

  private fillSelectors(): void {
    for (let i = 1; i <= 12; i++) {
      let k = (i < 10) ? ('0' + i) : i;
      this.monthSelector.push(k.toString());
    }

    let year = this.yearActual.toFixed().split('');
    let yearModified = parseInt(year[2] + year[3]);
    for (let k = yearModified; k <= (yearModified+ 8); k++) {
      this.yearSelector.push(k.toString());
    }
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
      monthExpiration: ['0', [
        Validators.required,
        this.validatorsService.validateOptionZero
      ]],
      yearExpiration: ['0', [
        Validators.required,
        this.validatorsService.validateOptionZero
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

  public get getMonthExpiration(): boolean {
    return this.formCreditCard.get('monthExpiration').invalid && this.formCreditCard.get('monthExpiration').touched
      || this.formCreditCard.get('monthExpiration').dirty && this.formCreditCard.get('monthExpiration').value === '0';
  }
  public get getYearExpiration(): boolean {
    return this.formCreditCard.get('yearExpiration').invalid && this.formCreditCard.get('yearExpiration').touched
      || this.formCreditCard.get('yearExpiration').dirty && this.formCreditCard.get('yearExpiration').value === '0';
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
      this.loading = true;
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
          }, (error) => {
            this.toastrService.error('Ha ocurrido un error al guardar la tajeta!', 'Error!');
            console.error(error);
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
            }
          }, (error) => {
            this.toastrService.error('Ha ocurrido un error al editar la tarjeta!', 'Error!');
            console.error(error);
          });
      }
    }
  }

  private getCreditCards(): void {
    this.loading = true;
    this.creditCardService.getCreditCards()
      .pipe(first())
      .subscribe((response: CreditCard[]) => {
        this.creditCards = response;
        this.loading = false;
      }, (error) => {
        console.error(error);
      });
  }

  public removeCreditCard(index: number, creditCard: CreditCard): void {
    Swal.fire({
      title: '¿Está seguro?',
      text: `Está seguro que desea borrar a ${ creditCard.titular }`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(response => {
      if (response.value) {
        this.loading = true;
        this.creditCardService.deleteCreditCard(index)
          .pipe(first())
          .subscribe((response: any) => {
            if (response.message) {
              this.toastrService.error(response.message, 'Tarjeta eliminada!');
              this.getCreditCards();
              this.formCreditCard.reset();
              this.action = 'Agregar';
              this.loading = false;
            }
          }, (error) => {
            console.error(error);
          });
      }
    });
  }

  public updateCreditCard(creditCard: CreditCard): void {
    this.action = 'Id: ' + creditCard['id'] + ' - Editar';
    this.id = creditCard['id'];

    this.formCreditCard.patchValue({
      titular: creditCard.titular,
      numeroTarjeta: creditCard.numeroTarjeta,
      fechaExpiracion: creditCard.fechaExpiracion,
      cvv: creditCard.cvv
    });
  }

  public showCardFront(value: boolean): void {
    this.changeFaceCard = value;
  }

  public get getImageCreditCard(): string {
    let numberCreditCard = this.formCreditCard.get('numeroTarjeta').value[0];
    if (numberCreditCard === '3') {
      return 'american-express';
    } else if (numberCreditCard === '4') {
      return 'visa';
    } else if (numberCreditCard === '5') {
      return 'mastercard'
    };
    return null;
  }

  public get getNumeroTarjetaValue(): string {
    return this.formCreditCard.get('numeroTarjeta').value;
  }

  public get getTitularValue(): string {
    return this.formCreditCard.get('titular').value ?
      this.formCreditCard.get('titular').value : 'JHON DOE';
  }

  public get getMonthExpirationValue(): string {
    return this.formCreditCard.get('monthExpiration').value !== '0' ?
      this.formCreditCard.get('monthExpiration').value : 'MM';
  }

  public get getYearExpirationValue(): string {
    return this.formCreditCard.get('yearExpiration').value !== '0' ?
      this.formCreditCard.get('yearExpiration').value : 'YY';
  }

  public get getCvvValue(): string {
    return this.formCreditCard.get('cvv').value;
  }

}
